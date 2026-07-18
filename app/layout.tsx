import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jarkko Moilanen | Data Product Pioneer",
  description:
    "Jarkko Moilanen builds the operating systems, standards, platforms, and methods that turn data and AI into governed business products.",
  icons: {
    icon: `${assetPath}/favicon.svg`,
    shortcut: `${assetPath}/favicon.svg`,
  },
  openGraph: {
    title: "Jarkko Moilanen | Data Product Pioneer",
    description:
      "Building the operating systems for data and AI products.",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
