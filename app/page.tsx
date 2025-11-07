'use client'

import { DomainScannerIframe } from "@/components/domain-scanner-iframe";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40">
      <section className="container">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient text-center mb-8">
          Scan your website for free
        </h1>
        <DomainScannerIframe 
          height={800}
          showBorder={true}
          borderRadius={8}
          className="w-full"
        />
      </section>
    </div>
  );
}
