import { absoluteUrl, SITE_URL } from "../seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    [
      "User-Agent: *",
      "Allow: /",
      "Content-Signal: ai-train=no, search=yes, ai-input=yes",
      `Agentmap: ${absoluteUrl("/.well-known/ai-catalog.json")}`,
      "",
      `Host: ${SITE_URL}`,
      `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
