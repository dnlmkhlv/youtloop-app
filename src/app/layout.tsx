import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTLoop - Loop YouTube Videos with Precision",
  description:
    "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more. Set precise start and end points for seamless looping.",
  keywords: "YouTube, video loop, AB loop, learning, practice, video player",
  authors: [{ name: "YouTLoop" }],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL("https://youtloop.app"),
  openGraph: {
    title: "YouTLoop - Loop YouTube Videos with Precision",
    description:
      "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "YouTLoop Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTLoop - Loop YouTube Videos with Precision",
    description:
      "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
