# Insights API Worker

Standalone Cloudflare Worker for the static Insights download modal.

This package deploys to the existing Cloudflare Worker:

```text
jarkko-insights-api
```

The GitHub Pages site calls:

```text
POST /insights/subscribe
```

Required Worker secrets:

```bash
wrangler secret put MAILERLITE_API_KEY
wrangler secret put MAILERLITE_RESEARCH_GROUP_ID
```

Allowed browser origins are defined in `src/index.js`. The source allows:

- `https://jarkkomoilanen.com`
- `https://www.jarkkomoilanen.com`
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3001`

`wrangler.jsonc` uses `keep_vars = true` and does not define MailerLite
variables, so dashboard-managed variables and secrets remain intact during
deployment.

Configure the secrets in Cloudflare, deploy, and set the public Worker URL in
the website repository variable:

```text
NEXT_PUBLIC_INSIGHTS_API_URL=https://your-worker.example.workers.dev
```

Deploy:

```bash
npm run dry-run
npm run deploy
```
