import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_TITLE,
  LINKEDIN_PROFILE_URL,
  PROFILE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./seo";

const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const googleAnalyticsId = "G-KZ5N2GTKF5";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      honorificSuffix: "PhD",
      url: SITE_URL,
      image: `${SITE_URL}/images/jarkko-hero-abudhabi-2026.jpeg`,
      jobTitle: "Senior AI and Data Product Leader",
      description: PROFILE_DESCRIPTION,
      sameAs: [
        LINKEDIN_PROFILE_URL,
        "https://www.udemy.com/user/jarkko-moilanen/",
        "https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM",
      ],
      knowsAbout: [
        "AI strategy",
        "Data products",
        "AI product portfolios",
        "AI Centers of Excellence",
        "Operating models",
        "AI agents",
        "Model Context Protocol",
        "APIs",
        "Knowledge graphs",
        "Ontologies",
        "Data governance",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Data Maestro Academy FZE LLC",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  authors: [{ name: "Jarkko Moilanen", url: SITE_URL }],
  creator: "Jarkko Moilanen",
  publisher: "Jarkko Moilanen",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: `${assetPath}/favicon.ico`, sizes: "any" },
      { url: `${assetPath}/favicon.svg`, type: "image/svg+xml" },
    ],
    shortcut: `${assetPath}/favicon.ico`,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: DEFAULT_OG_IMAGE_ALT,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
