import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Umami } from "@/components/umami";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "./navigation";
import { Providers } from "@/components/providers";
import { ScrollButtons } from "@/components/scroll-buttons";

const GTM_ID = "GTM-T6BP5H7S";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  keywords:
    "custom e-learning platform, online learning platform development, course platform development, custom LMS, school portal development, corporate training platform, Moodle alternative, Canvas alternative, educational platform development",
  authors: [{ name: "Rizon" }],
  creator: "Rizon",
  publisher: "Rizon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rizon.agency"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        bricolage.variable,
      )}
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <Navigation />
          {children}
          <ScrollButtons />
        </Providers>
        <SpeedInsights />
        <Analytics />
        <Umami />
      </body>
    </html>
  );
}
