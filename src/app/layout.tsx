import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
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
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
