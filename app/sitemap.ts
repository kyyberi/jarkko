import type { MetadataRoute } from "next";
import { getArticles } from "./article-data";
import { getInsightReports } from "./insights/reports";
import { absoluteUrl } from "./seo";
import { workItems } from "./site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/articles/"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/insights/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about/"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/engage/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/ai-products/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/services/odps/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/booking/"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: absoluteUrl(`/work/${item.slug}/`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}/`),
    lastModified: new Date(`${article.isoDate}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const insightReportRoutes: MetadataRoute.Sitemap = getInsightReports().map(
    (report) => ({
      url: absoluteUrl(`/insights/${report.slug}/`),
      lastModified: new Date(`${report.publishedAt}T00:00:00.000Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    ...staticRoutes,
    ...workRoutes,
    ...articleRoutes,
    ...insightReportRoutes,
  ];
}
