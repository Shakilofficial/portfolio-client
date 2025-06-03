/* eslint-disable @typescript-eslint/no-unused-vars */
import Providers from "@/lib/providers";

import type { Metadata } from "next";
import { Big_Shoulders_Text, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const bigshoulders = Big_Shoulders_Text({
  weight: "400",
  subsets: ["latin"],
});

const share_tech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakil's Portfolio",
  description:
    "Md Shakil Hossain is a software engineer and a full stack developer. He is passionate about building scalable and high-performance web applications. He has a strong background  development and has experience in building full-stack applications using various technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={share_tech.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
