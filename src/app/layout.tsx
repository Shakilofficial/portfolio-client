import Providers from "@/providers";
import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Sofia_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shakils Portfolio Dashboard",
  description: "A portfolio dashboard for Shakil's portfolio",
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
