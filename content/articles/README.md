# Articles

Each article is a Markdown file in this folder. The filename becomes the URL.

Example:

```md
---
title: Your article title
date: 2026-07-19
category: Data products
summary: One short sentence for article listings and RSS.
glance: First business-value takeaway. | Second business-value takeaway. | Third business-value takeaway.
status: draft
---

First paragraph.

## Section heading

Section paragraph.

![Useful illustration alt text](image-file.png "Optional caption")

Second paragraph.
```

Published files become:

```text
/insights/articles/your-article-title/
```

Use `status` to control publishing:

```text
status: draft      # private working draft
status: ready      # reviewed, still private
status: published  # public on the site, RSS, sitemap, and article route
```

Only `status: published` appears publicly.

Use `glance` for the right-rail "At a glance" box on article pages. Keep it to
2-4 short business-value bullets separated by `|`.

Use this helper to create a draft file:

```bash
npm run new:article -- "Your article title"
```

To create a draft from a PDF export:

```bash
npm run import:pdf-article -- "/path/to/article.pdf" \
  --title "Article title" \
  --date 2026-07-19 \
  --category "Data products" \
  --summary "One short sentence for listings and RSS."
```

You can also copy supplied illustrations while creating the draft:

```bash
npm run import:pdf-article -- "/path/to/article.pdf" \
  --title "Article title" \
  --image "/path/to/illustration-1.png" \
  --image "/path/to/illustration-2.png"
```

The PDF importer creates a Markdown draft. Review it before publishing because PDF text extraction may include broken line joins or source-site chrome.

PDF imports always include:

```md
status: draft
```

Change to `status: ready` while reviewing if useful. Change to `status: published` only when publishing.

## Article Images

Put article illustrations in:

```text
public/images/articles/<article-slug>/
```

Inside the Markdown file, either reference the full site path:

```md
![Portfolio flow](/images/articles/my-article/portfolio-flow.png "Portfolio flow from strategy to products")
```

Or reference only the filename:

```md
![Portfolio flow](portfolio-flow.png "Portfolio flow from strategy to products")
```

Filename-only image paths are resolved to:

```text
/images/articles/<article-slug>/portfolio-flow.png
```

The build fails if a local article image is referenced but missing.

Before pushing, run:

```bash
npm test
npm run build:pages
git add content/articles public/rss.xml
git commit -m "Add article title"
git push
```
