'use client'

import { useState, useEffect } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'
const LOGO_POSITION_KEY = 'onboardigital-logo-position'

// Valores por defecto guardados para producción (Vercel)
const DEFAULT_LOGO_SIZE = 80 // Tamaño final configurado
const DEFAULT_LOGO_POSITION = { left: 60, top: 0 } // Posición final

// Función para obtener valores iniciales desde localStorage o usar defaults
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
  return DEFAULT_LOGO_SIZE
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
  return DEFAULT_LOGO_POSITION
}

export const ResizableLogo = () => {
  const [logoHeight] = useState(getInitialSize)
  const [logoPosition] = useState(getInitialPosition)

  // Cargar valores guardados al montar
  useEffect(() => {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 90) {
        // Los valores se cargan en el estado inicial
      }
    }

    const savedPosition = localStorage.getItem(LOGO_POSITION_KEY)
    if (savedPosition) {
      try {
        const position = JSON.parse(savedPosition)
        // Los valores se cargan en el estado inicial
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
      <div
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
      </div>
    </div>
  )
}

