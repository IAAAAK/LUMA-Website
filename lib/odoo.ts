// Minimal Odoo external API client (JSON-RPC) for creating crm.lead records.
// Server-only: reads secrets from environment variables.
import "server-only";
import { describeLead, type Lead } from "./lead";

type OdooConfig = { url: string; db: string; username: string; apiKey: string };

function config(): OdooConfig | null {
  const { ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY } = process.env;
  if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME || !ODOO_API_KEY) return null;
  return { url: ODOO_URL.replace(/\/$/, ""), db: ODOO_DB, username: ODOO_USERNAME, apiKey: ODOO_API_KEY };
}

async function rpc<T>(cfg: OdooConfig, service: string, method: string, args: unknown[]): Promise<T> {
  const res = await fetch(`${cfg.url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", params: { service, method, args }, id: Date.now() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Odoo HTTP ${res.status}`);
  const body = (await res.json()) as { result?: T; error?: { message?: string; data?: { name?: string } } };
  // Only the error type is surfaced — Odoo messages can echo submitted values.
  if (body.error) throw new Error(`Odoo error: ${body.error.data?.name ?? "unknown"}`);
  return body.result as T;
}

async function findOrCreate(cfg: OdooConfig, uid: number, model: string, name: string): Promise<number> {
  const call = (method: string, args: unknown[], kwargs: Record<string, unknown> = {}) =>
    rpc<unknown>(cfg, "object", "execute_kw", [cfg.db, uid, cfg.apiKey, model, method, args, kwargs]);
  const ids = (await call("search", [[["name", "=", name]]], { limit: 1 })) as number[];
  if (ids.length) return ids[0];
  return (await call("create", [{ name }])) as number;
}

/** Creates the lead in Odoo and returns its id. Throws if Odoo is not configured or unreachable. */
export async function createOdooLead(lead: Lead): Promise<number> {
  const cfg = config();
  if (!cfg) throw new Error("Odoo is not configured");

  const uid = await rpc<number | false>(cfg, "common", "authenticate", [cfg.db, cfg.username, cfg.apiKey, {}]);
  if (!uid) throw new Error("Odoo authentication failed");

  const tagNames = [`Website ${lead.language.toUpperCase()}`, ...(lead.plan ? [`Plan interest: ${lead.plan}`] : [])];
  const tagIds = await Promise.all(tagNames.map((n) => findOrCreate(cfg, uid, "crm.tag", n)));
  const sourceId = await findOrCreate(cfg, uid, "utm.source", process.env.ODOO_SOURCE_NAME || "Website – LUMA");

  const values: Record<string, unknown> = {
    name: `LUMA demo request – ${lead.company}`,
    type: "lead",
    contact_name: lead.name,
    partner_name: lead.company,
    email_from: lead.email,
    phone: lead.whatsapp,
    description: describeLead(lead),
    source_id: sourceId,
    tag_ids: [[6, 0, tagIds]],
  };
  const teamId = Number(process.env.ODOO_SALES_TEAM_ID);
  if (Number.isInteger(teamId) && teamId > 0) values.team_id = teamId;

  const id = await rpc<number>(cfg, "object", "execute_kw", [cfg.db, uid, cfg.apiKey, "crm.lead", "create", [values]]);
  return id;
}
