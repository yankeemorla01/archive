import type { Metadata } from "next";

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
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          html, body {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow-x: hidden !important;
          }
          
          #__next {
            width: 100% !important;
            min-height: 100% !important;
            background: transparent !important;
          }
        `
      }} />
      {children}
    </>
  );
}

