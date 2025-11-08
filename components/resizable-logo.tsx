'use client'

import { useState, useEffect } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'
const LOGO_POSITION_KEY = 'onboardigital-logo-position'

// Función para obtener valores iniciales desde localStorage
const getInitialSize = () => {
  if (typeof window !== 'undefined') {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 90) {
        return size
      }
    }
  }
  return 50
}

const getInitialPosition = () => {
  if (typeof window !== 'undefined') {
    const savedPosition = localStorage.getItem(LOGO_POSITION_KEY)
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        return position
      } catch (e) {
        // Si hay error al parsear, usar posición por defecto
      }
    }
  }
  return { left: 60, top: 0 }
}

export const ResizableLogo = () => {
  const [logoHeight, setLogoHeight] = useState(getInitialSize)
  const [logoPosition, setLogoPosition] = useState(getInitialPosition)
  const [isMounted, setIsMounted] = useState(false)

  // Asegurar que se carga después de montar
  useEffect(() => {
    setIsMounted(true)
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    console.log('Logo size from localStorage:', savedSize)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      console.log('Parsed logo size:', size)
      if (size > 0 && size <= 90) {
        setLogoHeight(size)
        console.log('Logo height set to:', size)
      }
    }

    const savedPosition = localStorage.getItem(LOGO_POSITION_KEY)
    console.log('Logo position from localStorage:', savedPosition)
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        console.log('Parsed logo position:', position)
        setLogoPosition(position)
      } catch (e) {
        console.error('Error parsing logo position:', e)
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

