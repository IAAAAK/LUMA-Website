import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLead } from "./lead.ts";

const valid = {
  name: "Sara",
  email: "Sara@Example.com",
  dialCode: "+971",
  whatsapp: "050 123 4567",
  company: "Acme",
  country: "AE",
  consentData: true,
  consentWhatsapp: true,
  plan: "pro",
  credits: "30000",
  language: "ar",
};

test("accepts a complete submission and normalises it", () => {
  const lead = parseLead(valid);
  assert.ok(lead);
  assert.equal(lead.email, "sara@example.com");
  assert.equal(lead.whatsapp, "+971501234567");
  assert.equal(lead.plan, "pro");
  assert.equal(lead.credits, 30000);
  assert.equal(lead.language, "ar");
});

test("rejects missing consent, bad email or bad number", () => {
  assert.equal(parseLead({ ...valid, consentWhatsapp: false }), null);
  assert.equal(parseLead({ ...valid, email: "nope" }), null);
  assert.equal(parseLead({ ...valid, whatsapp: "12" }), null);
  assert.equal(parseLead({ ...valid, company: " " }), null);
});

test("ignores unknown plan values", () => {
  assert.equal(parseLead({ ...valid, plan: "gold" })?.plan, null);
});
