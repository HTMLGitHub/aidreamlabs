import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist(
{
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono(
{
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://aidreamlab.com";
const SITE_TITLE = "AIDreamLab - Turn one photo into a thousand realities";
const SITE_DESCRIPTION = "Face swaps, AI avatars, talkinng portraits, and video - all generated from a single photo.";

export const metadata: Metadata = 
{
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords:
  [
    "AI face swap",
    "AI photo generator",
    "AI avatar",
    "AI video generator",
    "talking portrait AI",
  ],
  alternates:
  {
    canonical: SITE_URL,
  },
  openGraph:
  {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "AIDreamLab",
    type: "website",
  },
  twitter:
  {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const jsonLd =
{
  "@context" : "https://schema.org",
  "@type" : "Organiztion",
  name: "AIDreamLab",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  parentOrganization: 
  {
    "@type" : "Organization",
    name : "Quantum Arc LLC",
  },
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
        {children}
        <Script defer data-domain="aidreamlab.com" src="https://plausible.io/js/script.js" strategy="afterInteractive"/>
      </body>
    </html>
  );
}
