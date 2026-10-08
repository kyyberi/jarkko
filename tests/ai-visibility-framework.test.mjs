import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const promptPath = new URL("../docs/ai-visibility/prompts.csv", import.meta.url);
const resultsPath = new URL(
  "../docs/ai-visibility/results-template.csv",
  import.meta.url,
);

function parseSimpleCsv(source) {
  return source
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((value) => value.replace(/^"|"$/g, "")));
}

test("defines twenty stable AI visibility prompts", async () => {
  const rows = parseSimpleCsv(await readFile(promptPath, "utf8"));
  const header = rows.shift();

  assert.deepEqual(header, [
    "prompt_id",
    "category",
    "prompt",
    "target_intent",
    "relevant_expertise",
    "expected_evidence_sources",
    "mention_expectation",
  ]);
  assert.equal(rows.length, 20);
  assert.equal(new Set(rows.map(([id]) => id)).size, 20);
  assert.deepEqual(
    new Set(rows.map(([, category]) => category)),
    new Set([
      "expert_discovery",
      "consultant_recommendation",
      "ai_transformation_leadership",
      "data_product_standards",
      "ai_agent_governance",
      "government_transformation",
      "education_transformation",
    ]),
  );

  for (const [id, , prompt, intent, expertise, evidence, expectation] of rows) {
    assert.match(id, /^[A-Z]{2,4}-\d{2}$/);
    assert.ok(prompt.length >= 35);
    assert.ok(intent.length > 0);
    assert.ok(expertise.length > 0);
    assert.match(evidence, /^https:\/\//);
    assert.match(expectation, /^(reasonable_candidate|possible_not_required)$/);
  }
});

test("provides one manual result row per prompt and platform", async () => {
  const prompts = parseSimpleCsv(await readFile(promptPath, "utf8")).slice(1);
  const rows = parseSimpleCsv(await readFile(resultsPath, "utf8"));
  const header = rows.shift();

  assert.deepEqual(header, [
    "run_date",
    "platform",
    "model_or_mode",
    "locale",
    "prompt_id",
    "jarkko_mentioned",
    "website_cited",
    "claims_accurate",
    "evidence_sources_cited",
    "competing_experts_or_sources",
    "notes",
  ]);
  assert.equal(rows.length, 80);

  const platforms = new Set(rows.map(([, platform]) => platform));
  assert.deepEqual(
    platforms,
    new Set(["ChatGPT Search", "Gemini", "Claude", "Perplexity"]),
  );

  const promptIds = new Set(prompts.map(([id]) => id));
  for (const [, , , , promptId] of rows) {
    assert.ok(promptIds.has(promptId));
  }
});
