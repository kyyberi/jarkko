export const SITE_URL = "https://jarkkomoilanen.com";
export const SITE_NAME = "Jarkko Moilanen";

export const DEFAULT_TITLE = "Jarkko Moilanen | Data Product Pioneer";
export const DEFAULT_DESCRIPTION =
  "Jarkko Moilanen builds the operating systems, standards, platforms, and methods that turn data and AI into governed business products.";

export const DEFAULT_OG_IMAGE = "/images/social-share.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Jarkko Moilanen social preview for data and AI product work";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function canonicalPath(path: string) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}
