import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    default: "Sunnysid33 - Game Master, Math Teacher, Bookworm",
    template: "%s | Sunnysid33",
  },
  description:
    "Personal website of Sunnysid33 - A Game Master, Math Teacher, and Bookworm based in Surabaya, Indonesia. Exploring TTRPG, Mathematics, and Lifestyle.",
  keywords: [
    "TTRPG",
    "Game Master",
    "Math Teacher",
    "Bookworm",
    "Surabaya",
    "Indonesia",
  ],
  authors: [{ name: "Sunnysid33" }],
};

export const viewport: Viewport = {
  themeColor: "#F5A623",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-background">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
