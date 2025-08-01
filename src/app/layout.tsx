import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "YouTLoop - Loop YouTube Videos with Precision",
  description:
    "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more. Set precise start and end points for seamless looping.",
  keywords: "YouTube, video loop, AB loop, learning, practice, video player",
  authors: [{ name: "YouTLoop" }],
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL("https://youtloop-app.vercel.app"),
  openGraph: {
    title: "YouTLoop - Loop YouTube Videos with Precision",
    description:
      "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/youtloop-og.png",
        width: 1200,
        height: 630,
        alt: "YouTLoop - Loop YouTube Videos with Precision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTLoop - Loop YouTube Videos with Precision",
    description:
      "Loop any YouTube video with AB loop functionality. Perfect for learning languages, sports, music, and more.",
    images: ["/youtloop-og.png"],
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
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
