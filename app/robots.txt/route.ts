import { absoluteUrl, SITE_URL } from "../seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    [
      "User-agent: GPTBot",
      "Disallow: /",
      "",
      "User-agent: ClaudeBot",
      "Disallow: /",
      "",
      "User-agent: OAI-SearchBot",
      "Allow: /",
      "",
      "User-agent: ChatGPT-User",
      "Allow: /",
      "",
      "User-agent: Claude-SearchBot",
      "Allow: /",
      "",
      "User-agent: Claude-User",
      "Allow: /",
      "",
      "User-agent: Googlebot",
      "Allow: /",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "",
      "User-agent: PerplexityBot",
      "Allow: /",
      "",
      "User-agent: Perplexity-User",
      "Allow: /",
      "",
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
