import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { articlesDirectory, slugify } from "./article-utils.mjs";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:article -- "Article title"');
  process.exit(1);
}

const slug = slugify(title);
const filePath = join(articlesDirectory, `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`Article already exists: ${filePath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const template = `---
title: ${title}
date: ${today}
category: Data products
summary: Replace this with one short sentence for listings and RSS.
---

First paragraph.

Second paragraph.
`;

writeFileSync(filePath, template);
console.log(filePath);
