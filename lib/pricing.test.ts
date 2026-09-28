import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateCredits, formatPlanPrice, recommendPlan } from "./pricing.ts";

test("monthly and yearly prices match the published table", () => {
  assert.equal(formatPlanPrice("starter", false), "$50");
  assert.equal(formatPlanPrice("pro", false), "$100");
  assert.equal(formatPlanPrice("enterprise", false), "$300");
  assert.equal(formatPlanPrice("starter", true), "$37.50");
  assert.equal(formatPlanPrice("pro", true), "$75");
  assert.equal(formatPlanPrice("enterprise", true), "$225");
});

test("credit estimate uses 60 per message and 600 per voice minute", () => {
  assert.deepEqual(estimateCredits(500, 0), { messageCredits: 30_000, voiceCredits: 0, total: 30_000 });
  assert.deepEqual(estimateCredits(10_000, 500), { messageCredits: 600_000, voiceCredits: 300_000, total: 900_000 });
});

test("recommendation thresholds are inclusive", () => {
  assert.equal(recommendPlan(0), "starter");
  assert.equal(recommendPlan(60_000), "starter");
  assert.equal(recommendPlan(60_001), "pro");
  assert.equal(recommendPlan(900_000), "pro");
  assert.equal(recommendPlan(900_001), "enterprise");
});
