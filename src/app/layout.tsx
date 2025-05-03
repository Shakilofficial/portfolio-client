import Providers from "@/lib/providers";

import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
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
      <body className={spaceMono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
