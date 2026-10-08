# AI visibility measurement framework

This framework measures whether AI search products can find and accurately support claims about Jarkko Moilanen. It does not treat a mention as success by itself. A correct answer that omits Jarkko when stronger candidates exist can be a valid result.

## Files

- `prompts.csv` contains 20 stable prompts with intent and expected evidence.
- `results-template.csv` contains one row for each prompt on ChatGPT Search Gemini Claude and Perplexity.
- `npm run test:ai-visibility` checks prompt count categories identifiers and result coverage.
- `npm run check:ai-discovery` checks the deployed site's live HTTP accessibility and rendered evidence surfaces.

## Manual test protocol

1. Run all prompts during the same two-day window.
2. Use a fresh conversation for every prompt and do not mention Jarkko before the test.
3. Enable the product's web search or research mode. Record the exact product model or mode shown in the interface.
4. Use English and record the test locale. Repeat a separate locale only as a separate run.
5. Paste the prompt exactly as stored. Record only the first answer before follow-up questions.
6. Save the answer and its cited URLs outside the CSV if a durable screenshot or transcript is required. Put the artifact path in `notes`.
7. Fill every result field. Do not convert an omission into an error when `mention_expectation` is `possible_not_required`.

## Result values

- `jarkko_mentioned`: `yes` or `no`.
- `website_cited`: `yes` when any `jarkkomoilanen.com` URL is cited as a source; otherwise `no`.
- `claims_accurate`: `accurate` `minor_issue` `major_issue` or `unverifiable`.
- `evidence_sources_cited`: semicolon-separated source URLs used by the answer.
- `competing_experts_or_sources`: exact names or organizations surfaced instead.
- `notes`: unsupported claims missing evidence stale role descriptions or test artifacts.

## Review metrics

Calculate results by category and platform rather than as one visibility score:

- mention rate among `reasonable_candidate` prompts;
- website citation rate when Jarkko is mentioned;
- independent-evidence citation rate when a professional claim is made;
- accurate-claim rate;
- unsupported-claim count;
- recurring competing experts and sources.

A useful quarterly outcome is fewer unsupported claims and more independent citations. A higher raw mention rate is secondary.

## Cadence and change control

Run a baseline before major content changes and repeat quarterly. Keep prompt wording stable for at least two consecutive runs. Add a new prompt only when a target professional context changes materially. Never edit an old result row after the run; copy the template into a dated results file such as `results-2026-10-08.csv`.

Google's `Google-Extended` control currently combines Gemini model-training use and Gemini grounding use. The site owner must make that policy decision explicitly because it cannot cleanly preserve one while declining the other.
