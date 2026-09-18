export const SITE_URL = "https://jarkkomoilanen.com";
export const SITE_NAME = "Jarkko Moilanen";
export const STATIC_ASSET_VERSION = "20260918-focus-area-images-v2";

export const DEFAULT_TITLE =
  "Jarkko Moilanen | Senior AI & Data Product Leader";
export const DEFAULT_DESCRIPTION =
  "Senior AI and data product leader helping government and enterprise teams decide what to build, govern AI portfolios, and move from pilots to working systems.";

export const DEFAULT_OG_IMAGE = versionedPublicPath("/images/social-share.webp");
export const DEFAULT_OG_IMAGE_ALT =
  "Jarkko Moilanen social preview for data and AI product work";

export const PROFILE_DESCRIPTION =
  "Jarkko Moilanen is a senior AI and data product leader based in Abu Dhabi, helping government and enterprise teams make AI portfolio, architecture, operating-model, and data product decisions.";

export const LINKEDIN_PROFILE_URL =
  "https://www.linkedin.com/in/jarkkomoilanen/";

export function versionedPublicPath(path: string) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${STATIC_ASSET_VERSION}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function canonicalPath(path: string) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}
