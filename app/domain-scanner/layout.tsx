import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Domain Scanner",
  description: "EasyDMARC Domain Scanner Widget",
};

/**
 * Domain Scanner Layout
 * Purpose: Layout without header for iframe embedding
 * Last Updated: 2025-01-28
 * Author: System
 */
export default function DomainScannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

