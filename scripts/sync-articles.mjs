import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getArticles, root } from "./article-utils.mjs";

const siteUrl = "https://jarkkomoilanen.com";
const articles = getArticles();

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Jarkko Moilanen - Insights</title>
    <link>${siteUrl}/</link>
    <description>Writing on data products, AI product portfolios, open standards, governance, and delivery.</description>
    <language>en</language>
${articles
  .map(
    (article) => `    <item>
      <title>${xml(article.title)}</title>
      <link>${siteUrl}/insights/articles/${article.slug}/</link>
      <pubDate>${new Date(`${article.isoDate}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${xml(article.summary)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(join(root, "public", "rss.xml"), rss);

function xml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
