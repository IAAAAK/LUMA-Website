// POST /api/lead — "Book a demo" submissions.
// Flow (CLAUDE.md): validate → verify Turnstile → create crm.lead in Odoo →
// if Odoo fails, email the submission to sales so no lead is lost.
// Never log personal data: only outcomes and Odoo ids.
import { parseLead, describeLead, type Lead } from "@/lib/lead";
import { createOdooLead } from "@/lib/odoo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Allowed only outside production so local development works without keys.
    return process.env.VERCEL_ENV !== "production";
  }
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function sendFallbackEmail(lead: Lead): Promise<boolean> {
  const { RESEND_API_KEY, LEAD_FALLBACK_FROM, LEAD_FALLBACK_TO } = process.env;
  if (!RESEND_API_KEY || !LEAD_FALLBACK_FROM || !LEAD_FALLBACK_TO) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: LEAD_FALLBACK_FROM,
        to: LEAD_FALLBACK_TO.split(",").map((s) => s.trim()),
        reply_to: lead.email,
        subject: `[Odoo unreachable] LUMA demo request – ${lead.company}`,
        text: `Odoo could not be reached, so this lead was not created automatically. Please add it manually.\n\n${describeLead(lead)}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const lead = parseLead(payload);
  if (!lead) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!(await verifyTurnstile(payload.turnstileToken, ip))) {
    return Response.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  try {
    const id = await createOdooLead(lead);
    console.info(`lead created, id ${id}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error(`odoo lead creation failed: ${err instanceof Error ? err.message : "unknown error"}`);
    const emailed = await sendFallbackEmail(lead);
    console.info(emailed ? "lead sent to fallback email" : "fallback email failed");
    if (emailed) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "server" }, { status: 502 });
  }
}
