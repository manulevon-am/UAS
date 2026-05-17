import type { Metadata } from "next";
import { Inter, Noto_Sans_Armenian } from "next/font/google";
import "./globals.css";

import { SITE_NAME, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  variable: "--font-noto-armenian",
  subsets: ["armenian", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "United Armenian Senate is a multilingual institutional platform for global Armenian representation, coordination, and strategic advocacy.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    "United Armenian Senate",
    "Всеармянский Сенат",
    "Համահայկական Սենատ",
    "Armenian diaspora",
    "institutional platform",
    "global Armenian network",
  ],
  openGraph: {
    title: SITE_NAME,
    description:
      "International institutional platform for Armenian representation, coordination, and long-term strategic work.",
    siteName: SITE_NAME,
    url: SITE_URL,
    type: "website",
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSansArmenian.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[var(--color-page)] text-[var(--color-graphite)]">
        {children}
      </body>
    </html>
  );
}
