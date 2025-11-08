'use client'

import { useState, useEffect } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'
const LOGO_POSITION_KEY = 'onboardigital-logo-position'

export const ResizableLogo = () => {
  const [logoHeight, setLogoHeight] = useState(50)
  const [logoPosition, setLogoPosition] = useState({ left: 60, top: 0 })

  // Cargar tamaño y posición guardados al montar
  useEffect(() => {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 90) {
        setLogoHeight(size)
      }
    }

    const savedPosition = localStorage.getItem(LOGO_POSITION_KEY)
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        setLogoPosition(position)
      } catch (e) {
        // Si hay error al parsear, usar posición por defecto
      }
    }
  }, [])


  return (
    <div
      style={{
        position: 'absolute',
        left: `${logoPosition.left}px`,
        top: `${logoPosition.top}px`,
        display: 'flex',
        alignItems: 'center',
        maxHeight: '90px'
      }}
    >
      <a 
        href="https://www.onboardigital.com/" 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Logo 
          className="w-auto" 
          style={{ 
            height: `${logoHeight}px`,
            maxHeight: `${logoHeight}px`,
            maxWidth: '300px'
          }} 
        />
      </a>
    </div>
  )
}

