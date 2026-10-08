# IndexNow deployment integration

This repository notifies IndexNow-supported search engines after a successful GitHub Pages deployment. IndexNow is a change-notification protocol. An accepted submission means the endpoint received the URLs; it does not guarantee crawling, indexing, ranking, citation, or inclusion in an AI answer.

Official protocol documentation: <https://www.indexnow.org/documentation>

## Deployment flow

The existing `.github/workflows/github-pages.yml` workflow performs these steps in order:

1. build the static GitHub Pages export;
2. run the existing project tests;
3. create a deterministic IndexNow manifest from `out/sitemap.xml` and the exported canonical HTML;
4. add a deployment marker containing the Git commit SHA;
5. deploy the Pages artifact;
6. wait until the production domain serves that exact marker;
7. verify the public IndexNow key file;
8. compare the current manifest with the last successfully submitted baseline;
9. submit justified new, updated, and confirmed removed URLs;
10. upload a result artifact;
11. update the baseline only after an accepted submission or a valid no-change run.

The notification job runs after deployment. A notification failure therefore cannot roll back the successful Pages deployment. The previous baseline is retained so a later run can retry.

## Key management

The stable IndexNow key file is:

`public/84785ff01b2aca6ab6fb93be999261bc53ef769b868fa871700ea14cd079911a.txt`

Production verification URL:

<https://jarkkomoilanen.com/84785ff01b2aca6ab6fb93be999261bc53ef769b868fa871700ea14cd079911a.txt>

The file name and file body must contain the same key. The key file is intentionally public under the IndexNow protocol. The workflow also reads the same value from the repository Actions secret `INDEXNOW_KEY`; this prevents the workflow from silently using a different value from the deployed verification file.

Configure the secret once before the first deployment:

```bash
gh secret set INDEXNOW_KEY \
  --repo kyyberi/jarkko \
  --body "$(tr -d '\n' < public/84785ff01b2aca6ab6fb93be999261bc53ef769b868fa871700ea14cd079911a.txt)"
```

Do not generate a new key during deployment.

### Rotate the key

1. Generate one new 8–128 character protocol-compatible key.
2. Add `public/NEW_KEY.txt` with only `NEW_KEY` as its content.
3. Update the key-file assertion in `tests/indexnow.test.mjs`.
4. Set the `INDEXNOW_KEY` Actions secret to the same value.
5. Deploy and confirm `https://jarkkomoilanen.com/NEW_KEY.txt` returns the key.
6. Run the workflow manually with `indexnow_mode: all`.
7. Remove the old key file only after the new submission is accepted.

## Change detection

`scripts/indexnow.mjs manifest` reads the generated sitemap, normalizes each production URL, and resolves it to its exported HTML file. A URL is eligible only when:

- it uses `https://jarkkomoilanen.com`;
- it has no query string, fragment, or credentials;
- exported HTML exists;
- it is not `noindex`;
- its canonical link matches the normalized sitemap URL.

The manifest hashes citation-relevant head metadata and the rendered `<main>` content. Next.js runtime and hydration scripts are excluded. Sitemap `lastmod` and build timestamps are not used as change evidence.

Comparison produces:

- **new:** absent from the previous baseline;
- **updated:** present in both manifests with a changed content hash;
- **removed:** present in the previous baseline and absent from the current manifest.

A removed URL is submitted only after the deployed URL returns `404` or `410`. A redirect is recorded but not submitted as a deletion. An unexpected live `200` remains in the baseline as a pending removal so it can be checked again after a future deployment.

On the first successful run, every eligible canonical URL is submitted as the initial baseline. An unchanged deployment sends no IndexNow API request.

## Baseline persistence

After a successful notification, the workflow stores `indexnow/manifest.json` on the dedicated `indexnow-state` branch. That branch does not trigger the Pages workflow, which listens only to `main`.

The baseline is not updated when production verification or IndexNow submission fails. This ensures the next successful deployment compares against the last accepted state rather than losing unsent changes.

## Submission and result handling

The workflow posts JSON batches to:

`https://api.indexnow.org/indexnow`

Each request includes:

- `host: jarkkomoilanen.com`;
- the stable key;
- the production key-file URL;
- up to 10,000 normalized URLs.

Responses are handled as follows:

- `200` and `202`: accepted;
- `400`: invalid request and no baseline update;
- `403`: key verification failure and no baseline update;
- `422`: URL, host, or key mismatch and no baseline update;
- `429`: bounded retry using `Retry-After` when present, then failure without a baseline update;
- network errors and common server failures: bounded retry with backoff.

Every run uploads `indexnow/submission-result.json` as the `indexnow-result-RUN_ID` Actions artifact for 30 days. Accepted status must not be described as successful indexing.

## Search and AI crawler compatibility

The repository's generated `robots.txt` explicitly allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, and Perplexity-User. GPTBot and ClaudeBot remain disallowed because model-training permission is a separate decision from search discovery and user-triggered retrieval.

Perplexity documents `PerplexityBot` as its search-results crawler rather than a foundation-model training crawler: <https://docs.perplexity.ai/docs/resources/perplexity-crawlers>.

IndexNow is independent of these crawler rules. It notifies participating search engines about URL changes; it is not an AI-indexing API and does not replace the sitemap or crawler access.

## Manual resubmission

Open **Actions → Deploy to GitHub Pages → Run workflow** and select:

- `changed` for the normal manifest comparison;
- `all` to resubmit every currently eligible canonical URL;
- `disabled` to deploy without running IndexNow.

Manual `all` is appropriate after key rotation or when an IndexNow operator specifically asks for a complete resubmission. It should not be used routinely.

## Disable the integration

Set the repository Actions variable `INDEXNOW_ENABLED` to `false`. Builds, tests, and Pages deployment continue, but the post-deployment IndexNow job is skipped.

To remove the integration permanently, remove the `indexnow` job, the manifest/marker build steps, the IndexNow script and tests, the key file, and the `INDEXNOW_KEY` repository secret.

## Local checks

```bash
npm run test:indexnow
npm run build:pages
npm run indexnow:manifest
```

Do not run the live `notify` command locally unless an intentional production submission is required. The GitHub Actions job is the source of truth because it waits for the deployed commit marker before submitting.

## Known limitations

- GitHub Pages provides no atomic hook between deployment completion and edge-cache propagation. The workflow therefore polls for a commit-specific marker before submission.
- Shared navigation, footer, or structured-data changes can legitimately change many page hashes because those pages' exported canonical content changed.
- A URL that still returns `200` after leaving the sitemap is retained as a pending removal and is not submitted until its deployed response becomes `404` or `410`.
- The dedicated state branch requires `contents: write` for the notification job. Repository rules must allow `github-actions[bot]` to update `indexnow-state`.
- IndexNow does not submit pages directly to Google Search, ChatGPT, Claude, or Perplexity. Existing sitemap, crawler, canonical, structured-data, and search-console mechanisms remain independent.
