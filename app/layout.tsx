import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer, Header } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://clearterms.example"),
  title: { default: "Clear Terms | Independent Customer Experiences", template: "%s | Clear Terms" },
  description: "Independent customer experiences and practical business setup awareness for entrepreneurs in the UAE.",
  openGraph: { title: "Clear Terms", description: "Read documented experiences. Understand common risks. Decide with clearer terms.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Clear Terms — Know the full story before you choose." }] },
  twitter: { card: "summary_large_image", title: "Clear Terms", description: "Independent customer experiences and business setup awareness.", images: ["/og.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${serif.variable}`}><Header /><main id="main">{children}</main><Footer /></body></html>;
}
