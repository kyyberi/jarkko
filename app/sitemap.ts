import type { MetadataRoute } from "next";
import { getArticles } from "./articles";
import { absoluteUrl } from "./seo";
import { workItems } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/insights/articles/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: absoluteUrl(`/work/${item.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: absoluteUrl(`/insights/articles/${article.slug}/`),
    lastModified: new Date(`${article.isoDate}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...articleRoutes];
}
