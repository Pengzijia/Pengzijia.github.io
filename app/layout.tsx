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

const title = "Peng Zijia — Personal Portfolio";
const description = "Peng Zijia 的个人网站：项目、思考与持续生长中的想法。";
const socialImage = "https://pengzijia.github.io/og.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://pengzijia.github.io"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: socialImage, width: 1733, height: 908, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
