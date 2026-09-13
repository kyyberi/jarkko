export const SITE_URL = "https://jarkkomoilanen.com";
export const SITE_NAME = "Jarkko Moilanen";

export const DEFAULT_TITLE =
  "Jarkko Moilanen | Senior AI & Data Product Leader";
export const DEFAULT_DESCRIPTION =
  "Senior AI and data product leader helping government and enterprise teams scale AI strategy, portfolios, Centers of Excellence, operating models, agents, MCP, APIs, and knowledge graphs.";

export const DEFAULT_OG_IMAGE = "/images/social-share.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Jarkko Moilanen social preview for data and AI product work";

export const PROFILE_DESCRIPTION =
  "Jarkko Moilanen is a senior AI and data product leader based in Abu Dhabi, helping government and enterprise teams turn AI and data initiatives into governed products at scale.";

export const LINKEDIN_PROFILE_URL =
  "https://www.linkedin.com/in/jarkkomoilanen/";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function canonicalPath(path: string) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}
