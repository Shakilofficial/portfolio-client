import Providers from "@/lib/providers";

import type { Metadata } from "next";
import { DM_Serif_Display, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Shakil's Portfolio",
  description:
    "Md Shakil Hossain is a software engineer and a full stack developer. He is passionate about building scalable and high-performance web applications. He has a strong background development and has experience in building full-stack applications using various technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSerifDisplay.variable} ${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className={`${manrope.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
