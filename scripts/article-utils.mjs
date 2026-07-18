import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const root = process.cwd();
export const articlesDirectory = join(root, "content", "articles");

export function getArticles() {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = readFileSync(join(articlesDirectory, fileName), "utf8");
      return parseArticle(slug, source);
    })
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArticle(slug, source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Article ${slug} is missing frontmatter.`);
  }

  const frontmatter = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(":");
        if (separator === -1) return [line, ""];
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^["']|["']$/g, ""),
        ];
      }),
  );

  const title = required(frontmatter, "title", slug);
  const isoDate = required(frontmatter, "date", slug);
  const category = required(frontmatter, "category", slug);
  const summary = required(frontmatter, "summary", slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Article ${slug} date must use YYYY-MM-DD.`);
  }

  return { slug, title, isoDate, category, summary };
}

function required(frontmatter, field, slug) {
  const value = frontmatter[field];
  if (!value) {
    throw new Error(`Article ${slug} is missing frontmatter field ${field}.`);
  }
  return value;
}
