# Articles

Each article is a Markdown file in this folder. The filename becomes the URL.

Example:

```md
---
title: Your article title
date: 2026-07-19
category: Data products
summary: One short sentence for article listings and RSS.
---

First paragraph.

Second paragraph.
```

That file becomes:

```text
/insights/articles/your-article-title/
```

Use this helper to create a draft file:

```bash
npm run new:article -- "Your article title"
```

Before pushing, run:

```bash
npm test
npm run build:pages
git add content/articles public/rss.xml
git commit -m "Add article title"
git push
```
