import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Free Domain Security Scanner - Check SPF, DKIM, DMARC, BIMI | OnBoarding Digital",
  description: "Scan your domain for free to check email security. Verify SPF, DKIM, DMARC, and BIMI records instantly. Free domain scanner for email authentication and cybersecurity. Check your domain security score now.",
  keywords: [
    "free domain scanner",
    "email security scan",
    "DMARC checker",
    "SPF DKIM verification",
    "domain security check",
    "email authentication scan",
    "cybersecurity domain scanner",
    "free domain security test",
    "domain scanner free",
    "email security scanner",
    "SPF checker",
    "DKIM checker",
    "DMARC scanner",
    "BIMI checker",
    "domain email security",
    "email authentication test",
    "free email security check",
    "domain security analyzer",
    "email security verification",
    "domain protection scanner"
  ],
  authors: [{ name: "OnBoarding Digital" }],
  creator: "OnBoarding Digital",
  publisher: "OnBoarding Digital",
  generator: 'Next.js',
  applicationName: "Domain Security Scanner",
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://scan.onboardigital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Free Domain Security Scanner - Check SPF, DKIM, DMARC, BIMI",
    description: "Scan your domain for free to check email security. Verify SPF, DKIM, DMARC, and BIMI records instantly. Free domain scanner for email authentication.",
    url: 'https://scan.onboardigital.com',
    siteName: 'OnBoarding Digital',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Domain Security Scanner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Domain Security Scanner - Check Email Authentication",
    description: "Scan your domain for free to check SPF, DKIM, DMARC, and BIMI records. Free email security scanner.",
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  other: {
    'google-site-verification': '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Domain Security Scanner",
    "description": "Free domain scanner to check email security. Verify SPF, DKIM, DMARC, and BIMI records instantly.",
    "url": "https://scan.onboardigital.com",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "OnBoarding Digital",
      "url": "https://www.onboardigital.com"
    },
    "featureList": [
      "SPF Record Checker",
      "DKIM Verification",
      "DMARC Scanner",
      "BIMI Checker",
      "Email Security Score",
      "Free Domain Scanner"
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OnBoarding Digital",
    "url": "https://www.onboardigital.com",
    "logo": "https://scan.onboardigital.com/icon.svg"
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Domain Security Scanner",
    "provider": {
      "@type": "Organization",
      "name": "OnBoarding Digital"
    },
    "description": "Free domain security scanner to check SPF, DKIM, DMARC, and BIMI records",
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://scan.onboardigital.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
        />
      </head>
      <body
        className={`${geistMono.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
