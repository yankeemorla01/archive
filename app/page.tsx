'use client'

import { Hero } from "@/components/hero";
import { Leva } from "leva";
import { DomainScannerIframe } from "@/components/domain-scanner-iframe";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container py-16">
        <DomainScannerIframe 
          height={800}
          showBorder={true}
          borderRadius={8}
          className="w-full"
        />
      </section>
      <Leva hidden />
    </>
  );
}
