/**
 * File: logo-ticker.tsx
 * Purpose: Displays a scrolling marquee of partner/customer logos to reinforce trust.
 * Last Updated: 2025-11-19
 * Author: Cascade
 */

import React from 'react'

// --- CUSTOM SVG LOGOS (White & Clean) ---
const LogoAlcatel = () => (
  <svg viewBox="0 0 200 50" className="h-14 w-auto fill-white">
    <text x="0" y="35" fontFamily="sans-serif" fontWeight="bold" fontSize="24">
      Alcatel-Lucent
    </text>
    <circle cx="180" cy="25" r="15" stroke="white" strokeWidth="2" fill="none" />
    <path d="M175 35 L180 15 L185 35" stroke="white" strokeWidth="2" fill="none" />
  </svg>
)

const LogoAutoLenders = () => (
  <svg viewBox="0 0 200 50" className="h-16 w-auto fill-white">
    <circle cx="25" cy="25" r="20" fill="white" />
    <text x="12" y="32" fontFamily="sans-serif" fontWeight="bold" fontSize="20" fill="#0f172a">
      AL
    </text>
    <text x="55" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">
      Auto
    </text>
    <text x="55" y="42" fontFamily="sans-serif" fontWeight="bold" fontSize="18">
      Lenders
    </text>
  </svg>
)

const LogoFxPro = () => (
  <svg viewBox="0 0 150 50" className="h-14 w-auto fill-white">
    <text x="0" y="35" fontFamily="serif" fontWeight="bold" fontSize="32">
      FxPro
    </text>
    <text x="0" y="48" fontFamily="sans-serif" fontSize="8">
      Trade Like a Pro
    </text>
  </svg>
)

const LogoPurple = () => (
  <svg viewBox="0 0 150 50" className="h-14 w-auto fill-white">
    <text x="0" y="35" fontFamily="sans-serif" fontWeight="bold" fontSize="32" letterSpacing="-1">
      purple
    </text>
    <circle cx="110" cy="15" r="3" fill="white" />
  </svg>
)

const LogoPicsart = () => (
  <svg viewBox="0 0 150 50" className="h-16 w-auto fill-white">
    <text x="0" y="35" fontFamily="sans-serif" fontWeight="500" fontSize="30">
      Picsart
    </text>
  </svg>
)

const LogoPortainer = () => (
  <svg viewBox="0 0 200 50" className="h-16 w-auto fill-white">
    <path d="M10 10 h20 v30 h-20 z M15 5 v5 M25 5 v5" fill="none" stroke="white" strokeWidth="2" />
    <text x="40" y="35" fontFamily="monospace" fontWeight="bold" fontSize="24">
      portainer.io
    </text>
  </svg>
)

const LogoG2 = () => (
  <svg viewBox="0 0 60 60" className="h-16 w-auto fill-white">
    <path d="M30 5 L55 18 L55 42 L30 55 L5 42 L5 18 Z" fill="none" stroke="white" strokeWidth="3" />
    <text x="15" y="40" fontFamily="sans-serif" fontWeight="bold" fontSize="28">
      G2
    </text>
  </svg>
)

const LogoPanasonic = () => (
  <svg viewBox="0 0 200 50" className="h-15 w-auto fill-white">
    <text x="0" y="35" fontFamily="sans-serif" fontWeight="800" fontSize="28" letterSpacing="1">
      Panasonic
    </text>
  </svg>
)

const LogoTelAviv = () => (
  <svg viewBox="0 0 150 50" className="h-16 w-auto fill-white">
    <path d="M0 25 L10 15 L20 35 L30 15 L40 25" fill="none" stroke="white" strokeWidth="2" />
    <path d="M0 30 L10 20 L20 40 L30 20 L40 30" fill="none" stroke="white" strokeWidth="2" />
    <text x="50" y="25" fontFamily="sans-serif" fontSize="10" fontWeight="bold">
      TEL AVIV
    </text>
    <text x="50" y="35" fontFamily="sans-serif" fontSize="10">
      STOCK EXCHANGE
    </text>
  </svg>
)

const COMPANY_LOGOS = [
  LogoAlcatel,
  LogoAutoLenders,
  LogoFxPro,
  LogoPurple,
  LogoPicsart,
  LogoPortainer,
  LogoG2,
  LogoPanasonic,
  LogoTelAviv,
]

const LogoTicker = () => {
  const tickerStyles = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `

  return (
    <div className="w-full bg-[#0B1121] border-t border-slate-800 text-white py-8 flex flex-col justify-center items-center overflow-hidden relative">
      <style>{tickerStyles}</style>

      <div className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest z-20 relative">
        Join the <span className="font-bold" style={{ color: '#FD6262' }}>175,000+</span> domains secured
      </div>

      <div className="w-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#0B1121] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#0B1121] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {[0, 1, 2].map((setIndex) => (
            <div
              key={`logo-set-${setIndex}`}
              className="flex gap-16 px-8 items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {COMPANY_LOGOS.map((Logo, logoIndex) => (
                <div
                  key={`logo-${setIndex}-${logoIndex}`}
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Logo />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoTicker
