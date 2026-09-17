import type { MetadataRoute } from "next";
import { getArticles } from "./article-data";
import { getInsightReports } from "./insights/reports";
import { bookingServices } from "./booking/services";
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
      url: absoluteUrl("/articles/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/insights/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/services/odps/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/booking/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: absoluteUrl(`/work/${item.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const bookingRoutes: MetadataRoute.Sitemap = bookingServices.map((service) => ({
    url: absoluteUrl(`/booking/${service.id}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: service.bookingType === "direct" ? 0.8 : 0.7,
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
    ...bookingRoutes,
    ...workRoutes,
    ...articleRoutes,
    ...insightReportRoutes,
  ];
}
