'use client'

import { useState, useEffect, useRef } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'

export const ResizableLogo = () => {
  const [logoHeight, setLogoHeight] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const startHeightRef = useRef(0)

  // Cargar tamaño guardado al montar
  useEffect(() => {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 90) {
        setLogoHeight(size)
      }
    }
  }, [])

  // Guardar tamaño cuando cambia
  useEffect(() => {
    localStorage.setItem(LOGO_SIZE_KEY, logoHeight.toString())
  }, [logoHeight])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    startYRef.current = e.clientY
    startHeightRef.current = logoHeight
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY // Invertido para que arrastrar hacia arriba aumente el tamaño
      const newHeight = Math.max(10, Math.min(90, startHeightRef.current + deltaY))
      setLogoHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginRight: '60px',
        maxHeight: '90px'
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
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
            maxWidth: '300px',
            transition: isResizing ? 'none' : 'height 0.2s ease'
          }} 
        />
        
        {showControls && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '-30px',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'ns-resize',
              padding: '4px',
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '4px',
              zIndex: 1000
            }}
            onMouseDown={handleMouseDown}
          >
            <div
              style={{
                width: '20px',
                height: '4px',
                background: '#fff',
                borderRadius: '2px',
                marginBottom: '2px'
              }}
            />
            <div
              style={{
                width: '20px',
                height: '4px',
                background: '#fff',
                borderRadius: '2px',
                marginBottom: '2px'
              }}
            />
            <div
              style={{
                width: '20px',
                height: '4px',
                background: '#fff',
                borderRadius: '2px'
              }}
            />
            <div
              style={{
                fontSize: '10px',
                color: '#fff',
                marginTop: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              {logoHeight}px
            </div>
          </div>
        )}
      </a>
    </div>
  )
}

