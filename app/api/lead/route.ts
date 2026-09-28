// POST /api/lead — "Book a demo" submissions.
// Flow (CLAUDE.md): validate → verify Turnstile → email the request to sales.
// Never log personal data: only outcomes.
import { parseLead } from "@/lib/lead";
import { sendLeadEmail } from "@/lib/email";

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
    await sendLeadEmail(lead);
    console.info("lead emailed to sales");
    return Response.json({ ok: true });
  } catch (err) {
    console.error(`lead email failed: ${err instanceof Error ? err.message : "unknown error"}`);
    return Response.json({ ok: false, error: "server" }, { status: 502 });
  }
}
