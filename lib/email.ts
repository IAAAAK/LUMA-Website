// Sends demo requests to the sales inbox via Resend's HTTP API.
// Server-only: reads secrets from environment variables.
import "server-only";
import { describeLead, type Lead } from "./lead";

/** Emails the lead to sales. Throws if email is not configured or Resend rejects the request. */
export async function sendLeadEmail(lead: Lead): Promise<void> {
  const { RESEND_API_KEY, LEAD_EMAIL_FROM, LEAD_EMAIL_TO } = process.env;
  if (!RESEND_API_KEY || !LEAD_EMAIL_FROM || !LEAD_EMAIL_TO) throw new Error("Lead email is not configured");

  const plan = lead.plan ? ` (${lead.plan})` : "";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: LEAD_EMAIL_FROM,
      to: LEAD_EMAIL_TO.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: `LUMA demo request – ${lead.company}${plan}`,
      text: `New demo request from the LUMA website. Reply to this email to contact the customer.\n\n${describeLead(lead)}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  // Only the status is surfaced — the response body can echo submitted values.
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}`);
}
