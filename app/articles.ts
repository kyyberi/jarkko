import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type ArticleBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export type Article = {
  slug: string;
  date: string;
  isoDate: string;
  title: string;
  category: string;
  summary: string;
  body: ArticleBlock[];
};

const articlesDirectory = join(process.cwd(), "content", "articles");

export function getArticles(): Article[] {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = readFileSync(join(articlesDirectory, fileName), "utf8");
      return parseArticle(slug, source);
    })
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

function parseArticle(slug: string, source: string): Article {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Article ${slug} is missing frontmatter.`);
  }

  const frontmatter = parseFrontmatter(match[1]);
  const body = match[2]
    .trim()
    .split(/\n{2,}/)
    .map((block) => parseBodyBlock(slug, block))
    .filter((block): block is ArticleBlock => Boolean(block));

  const title = requireField(frontmatter, "title", slug);
  const isoDate = requireField(frontmatter, "date", slug);
  const category = requireField(frontmatter, "category", slug);
  const summary = requireField(frontmatter, "summary", slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Article ${slug} date must use YYYY-MM-DD.`);
  }

  return {
    slug,
    date: formatDisplayDate(isoDate),
    isoDate,
    title,
    category,
    summary,
    body,
  };
}

function parseBodyBlock(slug: string, block: string): ArticleBlock | undefined {
  const trimmed = block.trim();
  if (!trimmed) return undefined;

  const image = trimmed.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/);
  if (image) {
    return {
      type: "image",
      alt: image[1].trim(),
      src: resolveImageSrc(slug, image[2].trim()),
      caption: image[3]?.trim(),
    };
  }

  return {
    type: "paragraph",
    text: trimmed.replace(/\s*\n\s*/g, " ").trim(),
  };
}

function resolveImageSrc(slug: string, source: string) {
  if (/^https?:\/\//.test(source)) return source;

  const src = source.startsWith("/")
    ? source
    : `/images/articles/${slug}/${source.replace(/^\.\//, "")}`;

  const publicPath = join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!existsSync(publicPath)) {
    throw new Error(
      `Article ${slug} references missing image ${src}. Place it in public/images/articles/${slug}/.`,
    );
  }

  return src;
}

function parseFrontmatter(source: string): Record<string, string> {
  return Object.fromEntries(
    source
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
}

function requireField(
  frontmatter: Record<string, string>,
  field: string,
  slug: string,
) {
  const value = frontmatter[field];
  if (!value) {
    throw new Error(`Article ${slug} is missing frontmatter field ${field}.`);
  }
  return value;
}

function formatDisplayDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(`${isoDate}T00:00:00Z`))
    .toUpperCase();
}
