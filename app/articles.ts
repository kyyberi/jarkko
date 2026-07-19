import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type ArticleBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      level: 2 | 3;
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
  status: ArticleStatus;
  date: string;
  isoDate: string;
  title: string;
  category: string;
  summary: string;
  glance: string[];
  body: ArticleBlock[];
};

const articlesDirectory = join(process.cwd(), "content", "articles");
const articleStatuses = ["draft", "ready", "published"] as const;
type ArticleStatus = (typeof articleStatuses)[number];

export function getArticles(): Article[] {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = readFileSync(join(articlesDirectory, fileName), "utf8");
      return parseArticle(slug, source);
    })
    .filter((article) => article.status === "published")
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
  const glance = parseListField(frontmatter.glance);
  const status = parseStatus(frontmatter, slug);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`Article ${slug} date must use YYYY-MM-DD.`);
  }

  return {
    slug,
    status,
    date: formatDisplayDate(isoDate),
    isoDate,
    title,
    category,
    summary,
    glance,
    body,
  };
}

function parseStatus(
  frontmatter: Record<string, string>,
  slug: string,
): ArticleStatus {
  const status = frontmatter.status;
  if (!status && frontmatter.draft === "true") return "draft";
  if (!status) return "published";
  if (articleStatuses.includes(status as ArticleStatus)) {
    return status as ArticleStatus;
  }
  throw new Error(
    `Article ${slug} status must be one of: ${articleStatuses.join(", ")}.`,
  );
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

  const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
  if (heading) {
    return {
      type: "heading",
      level: heading[1].length as 2 | 3,
      text: heading[2].trim(),
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

function parseListField(value?: string) {
  if (!value) return [];
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
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
