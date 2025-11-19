'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

// --- Iconos SVG (Inline para evitar dependencias) ---
const IconGlobe = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
)

const IconUsers = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconServer = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
)

const IconMapPin = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

interface LocationPoint {
  id: number
  country: string
  lat: number
  lng: number
  value: number
  color: string
}

const LOCATIONS: LocationPoint[] = [
  { id: 1, country: 'United States (West)', lat: 37.0902, lng: -110.7129, value: 650, color: '#a78bfa' },
  { id: 2, country: 'United States (East)', lat: 40.7128, lng: -74.006, value: 800, color: '#a78bfa' },
  { id: 3, country: 'Mexico', lat: 23.6345, lng: -102.5528, value: 180, color: '#d8b4fe' },
  { id: 4, country: 'Brazil', lat: -14.235, lng: -51.9253, value: 300, color: '#c084fc' },
  { id: 5, country: 'Argentina', lat: -38.4161, lng: -63.6167, value: 180, color: '#d8b4fe' },
  { id: 6, country: 'Colombia', lat: 4.5709, lng: -74.2973, value: 150, color: '#d8b4fe' },
  { id: 7, country: 'Canada', lat: 56.1304, lng: -106.3468, value: 250, color: '#c084fc' },
  { id: 8, country: 'Chile', lat: -35.6751, lng: -71.5429, value: 100, color: '#e9d5ff' },
  { id: 9, country: 'Peru', lat: -9.19, lng: -75.015, value: 90, color: '#e9d5ff' },
  { id: 10, country: 'United Kingdom', lat: 55.3781, lng: -3.436, value: 700, color: '#3b82f6' },
  { id: 11, country: 'Germany', lat: 51.1657, lng: 10.4515, value: 600, color: '#3b82f6' },
  { id: 12, country: 'France', lat: 46.2276, lng: 2.2137, value: 450, color: '#60a5fa' },
  { id: 13, country: 'Netherlands', lat: 52.1326, lng: 5.2913, value: 500, color: '#3b82f6' },
  { id: 14, country: 'Spain', lat: 40.4637, lng: -3.7492, value: 250, color: '#60a5fa' },
  { id: 15, country: 'Italy', lat: 41.8719, lng: 12.5674, value: 200, color: '#60a5fa' },
  { id: 16, country: 'Poland', lat: 51.9194, lng: 19.1451, value: 180, color: '#93c5fd' },
  { id: 17, country: 'Sweden', lat: 60.1282, lng: 18.6435, value: 120, color: '#93c5fd' },
  { id: 18, country: 'Ukraine', lat: 48.3794, lng: 31.1656, value: 100, color: '#93c5fd' },
  { id: 19, country: 'Turkey', lat: 38.9637, lng: 35.2433, value: 180, color: '#7dd3fc' },
  { id: 20, country: 'South Africa', lat: -30.5595, lng: 22.9375, value: 250, color: '#818cf8' },
  { id: 21, country: 'Egypt', lat: 26.8206, lng: 30.8025, value: 150, color: '#7dd3fc' },
  { id: 22, country: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, value: 180, color: '#7dd3fc' },
  { id: 23, country: 'Nigeria', lat: 9.082, lng: 8.6753, value: 90, color: '#a78bfa' },
  { id: 24, country: 'India', lat: 20.5937, lng: 78.9629, value: 350, color: '#7dd3fc' },
  { id: 25, country: 'China', lat: 35.8617, lng: 104.1954, value: 400, color: '#7dd3fc' },
  { id: 26, country: 'Japan', lat: 36.2048, lng: 138.2529, value: 200, color: '#7dd3fc' },
  { id: 27, country: 'Indonesia', lat: -0.7893, lng: 113.9213, value: 220, color: '#94a3b8' },
  { id: 28, country: 'Philippines', lat: 12.8797, lng: 121.774, value: 130, color: '#94a3b8' },
  { id: 29, country: 'Thailand', lat: 15.87, lng: 100.9925, value: 110, color: '#94a3b8' },
  { id: 30, country: 'Vietnam', lat: 14.0583, lng: 108.2772, value: 100, color: '#94a3b8' },
  { id: 31, country: 'Kazakhstan', lat: 48.0196, lng: 66.9237, value: 80, color: '#7dd3fc' },
  { id: 32, country: 'Pakistan', lat: 30.3753, lng: 69.3451, value: 150, color: '#7dd3fc' },
  { id: 33, country: 'Australia', lat: -25.2744, lng: 133.7751, value: 400, color: '#94a3b8' },
  { id: 34, country: 'New Zealand', lat: -40.9006, lng: 174.886, value: 120, color: '#94a3b8' },
  { id: 35, country: 'Spain (South)', lat: 37, lng: -4, value: 80, color: '#93c5fd' },
  { id: 36, country: 'Morocco', lat: 31.7917, lng: -7.0926, value: 70, color: '#a78bfa' },
  { id: 37, country: 'Norway', lat: 60.472, lng: 8.4689, value: 60, color: '#93c5fd' },
  { id: 38, country: 'Finland', lat: 64, lng: 26, value: 50, color: '#93c5fd' },
  { id: 39, country: 'Iran', lat: 32.4279, lng: 53.688, value: 100, color: '#7dd3fc' },
  { id: 40, country: 'Ethiopia', lat: 9.145, lng: 40.4897, value: 40, color: '#a78bfa' },
  { id: 41, country: 'DR Congo', lat: -4.0383, lng: 21.7587, value: 30, color: '#a78bfa' },
  { id: 42, country: 'South Korea', lat: 35.9078, lng: 127.7669, value: 250, color: '#7dd3fc' },
  { id: 43, country: 'Russia', lat: 61.524, lng: 105.3188, value: 200, color: '#7dd3fc' },
  { id: 44, country: 'Taiwan', lat: 23.6978, lng: 121.0264, value: 150, color: '#7dd3fc' },
  { id: 45, country: 'Hong Kong', lat: 22.3964, lng: 114.1095, value: 100, color: '#7dd3fc' },
  { id: 46, country: 'Singapore', lat: 1.3521, lng: 103.8198, value: 80, color: '#7dd3fc' },
  { id: 47, country: 'Malaysia', lat: 2.5, lng: 112.5, value: 70, color: '#94a3b8' },
  { id: 48, country: 'Bangladesh', lat: 23.685, lng: 90.3563, value: 60, color: '#94a3b8' },
  { id: 49, country: 'Sri Lanka', lat: 7.8731, lng: 80.7718, value: 50, color: '#94a3b8' },
  { id: 50, country: 'Myanmar', lat: 21.9162, lng: 95.956, value: 40, color: '#94a3b8' },
]

const GlobalPresenceMap = () => {
  const [leafletReady, setLeafletReady] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const markerAnimationsRef = useRef<{ marker: any; targetRadius: number; delay: number }[]>([])
  const shouldAnimateRef = useRef(false)
  const hasAnimatedRef = useRef(false)

  const startMarkerAnimation = useCallback(() => {
    if (!shouldAnimateRef.current) return
    if (hasAnimatedRef.current) return
    if (!markerAnimationsRef.current.length) return

    hasAnimatedRef.current = true
    markerAnimationsRef.current.forEach(({ marker, targetRadius, delay }) => {
      let currentRadius = 0
      const animateEntry = () => {
        if (currentRadius < targetRadius) {
          currentRadius += 0.8
          marker.setRadius(currentRadius)
          requestAnimationFrame(animateEntry)
        }
      }
      setTimeout(animateEntry, delay)
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ((window as any).L && (window as any).L.map) {
      setLeafletReady(true)
      return
    }

    const existingScript = document.querySelector('script[src*="leaflet.js"]')
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if ((window as any).L && (window as any).L.map) {
          setLeafletReady(true)
          clearInterval(checkInterval)
        }
      }, 100)
      return () => clearInterval(checkInterval)
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.async = true
    script.onload = () => {
      if ((window as any).L && (window as any).L.map) setLeafletReady(true)
    }
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || !(window as any).L) return
    if (mapInstanceRef.current) return

    const L = (window as any).L
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: false,
      scrollWheelZoom: true,
      minZoom: 2,
      attributionControl: false,
      maxBounds: [[-90, -180], [90, 180]],
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapInstanceRef.current = map

    markerAnimationsRef.current = []

    LOCATIONS.forEach((location) => {
      const radius = Math.sqrt(location.value) * 2.5

      const marker = L.circleMarker([location.lat, location.lng], {
        radius: 0,
        fillColor: location.color,
        fillOpacity: 0.6,
        color: 'white',
        weight: 2,
        className: 'pulsing-marker',
      })
      marker.addTo(map)
      markersRef.current.push(marker)

      markerAnimationsRef.current.push({
        marker,
        targetRadius: radius,
        delay: location.id * 80,
      })

      // Add tooltip
      marker.bindTooltip(
        `
          <div class="text-center font-sans">
            <div class="font-bold text-slate-800">${location.country}</div>
          </div>
        `,
        {
          direction: 'top',
          offset: [0, -10],
          className: 'custom-leaflet-tooltip',
          opacity: 1,
        }
      )

      marker.on('mouseover', () => {
        marker.setStyle({ fillOpacity: 0.9, weight: 3 })
      })

      marker.on('mouseout', () => {
        marker.setStyle({ fillOpacity: 0.6, weight: 2 })
      })

      marker.on('click', () => {
        map.flyTo([location.lat, location.lng], 5, { duration: 1.5 })
      })
    })

    startMarkerAnimation()

    return () => {
      map.remove()
      mapInstanceRef.current = null
      markerAnimationsRef.current = []
    }
  }, [leafletReady, startMarkerAnimation])

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            shouldAnimateRef.current = true
            startMarkerAnimation()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.45 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [startMarkerAnimation])

  const customStyles = `
    .leaflet-container {
      background: #0f172a;
      font-family: 'Inter', sans-serif;
      outline: none;
    }
    .custom-leaflet-tooltip {
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
      padding: 6px 10px;
      font-family: inherit;
    }
    .custom-leaflet-tooltip::before { display: none; }
    .pulsing-marker {
      animation: pulse-border 2s infinite ease-out;
    }
    @keyframes pulse-border {
      0% { stroke-width: 1; stroke-opacity: 0.8; }
      50% { stroke-width: 3; stroke-opacity: 0.3; }
      100% { stroke-width: 1; stroke-opacity: 0.8; }
    }
  `

  return (
    <section ref={sectionRef} className="w-full bg-[#05070F] py-12 sm:py-16 lg:py-20 px-4 text-white">
      <style>{customStyles}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header - Outside map */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#FD6262' }}>
            175,000+ domains from 130 countries
          </h2>
        </div>

        {/* Map Container - Boxed */}
        <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}

export default GlobalPresenceMap
