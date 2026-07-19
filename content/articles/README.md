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

![Useful illustration alt text](image-file.png "Optional caption")

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
