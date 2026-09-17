# Insights Subscribe Worker

Standalone Cloudflare Worker for the static Insights download modal.

The GitHub Pages site calls:

```text
POST /insights/subscribe
```

Required Worker secrets:

```bash
wrangler secret put MAILERLITE_API_KEY
wrangler secret put MAILERLITE_RESEARCH_GROUP_ID
```

Allowed browser origins are configured through `ALLOWED_ORIGINS`. The default
source allows:

- `https://jarkkomoilanen.com`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Copy `wrangler.toml.example` to `wrangler.toml`, adjust the Worker name if
needed, configure the secrets, deploy, and set the public Worker URL in the
website repository variable:

```text
NEXT_PUBLIC_INSIGHTS_API_URL=https://your-worker.example.workers.dev
```
