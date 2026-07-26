import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer, Header } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://clearterms.example"),
  title: { default: "Make Your Brand Business Service LLC Customer Experience | Clear Terms", template: "%s | Clear Terms" },
  description: "A personal, carefully attributed customer experience involving Make Your Brand Business Service LLC, with payments, timeline and right of response.",
  openGraph: { title: "A Customer Experience Worth Reading | Clear Terms", description: "Payments, communication and a fair right of response.", type: "website", images: [{ url: "/og-review.png", width: 1200, height: 630, alt: "Clear Terms — A customer experience worth reading." }] },
  twitter: { card: "summary_large_image", title: "A Customer Experience Worth Reading | Clear Terms", description: "Payments, communication and a fair right of response.", images: ["/og-review.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f5ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${serif.variable}`}><Header /><main id="main">{children}</main><Footer /></body></html>;
}
