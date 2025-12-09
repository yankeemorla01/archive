'use client'

import { useState, useEffect, useRef } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'
const LOGO_POSITION_KEY = 'onboardigital-logo-position'

// Valores por defecto
const DEFAULT_LOGO_SIZE = 85
const DEFAULT_LOGO_POSITION = { left: 8, top: 6 }
const POSITION_SHIFT_KEY = 'onboardigital-logo-shifted-v2'
const POSITION_SHIFT_AMOUNT = 6

// Función para obtener valores iniciales desde localStorage o usar defaults
const getInitialSize = () => {
  if (typeof window !== 'undefined') {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 200) {
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

type LogoPosition = { left: number; top: number }

export const ResizableLogo = () => {
  const [logoHeight, setLogoHeight] = useState(getInitialSize)
  const [logoPosition, setLogoPosition] = useState<LogoPosition>(getInitialPosition)
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [savedMessage, setSavedMessage] = useState(false)
  
  const logoRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const initialSize = useRef(0)

  // Cargar valores guardados al montar
  useEffect(() => {
    const savedSize = localStorage.getItem(LOGO_SIZE_KEY)
    if (savedSize) {
      const size = parseInt(savedSize, 10)
      if (size > 0 && size <= 200) {
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

    // Apply upward shift once to give the logo more breathing room
    const hasShifted = localStorage.getItem(POSITION_SHIFT_KEY)
    if (!hasShifted) {
      setLogoPosition((prev) => {
        const shifted = {
          ...prev,
          top: Math.max(0, prev.top - POSITION_SHIFT_AMOUNT)
        }
        localStorage.setItem(LOGO_POSITION_KEY, JSON.stringify(shifted))
        return shifted
      })
      localStorage.setItem(POSITION_SHIFT_KEY, 'true')
    }
  }, [])

  // Manejar redimensionamiento
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    initialSize.current = logoHeight
    const startY = e.clientY
    const startHeight = logoHeight

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY
      const newHeight = Math.max(20, Math.min(200, startHeight + deltaY))
      setLogoHeight(newHeight)
      setHasChanges(true)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Manejar arrastre
  const handleDragMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX - logoPosition.left,
      y: e.clientY - logoPosition.top
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        left: e.clientX - dragStartPos.current.x,
        top: e.clientY - dragStartPos.current.y
      }
      // Permitir movimiento más a la izquierda (hasta -200px para que el logo pueda salir parcialmente)
      // pero asegurar que los botones de control sigan siendo accesibles
      const minLeft = -200 // Permite que el logo salga hacia la izquierda
      const maxLeft = window.innerWidth - 100
      const maxTop = 120 - logoHeight
      newPosition.left = Math.max(minLeft, Math.min(maxLeft, newPosition.left))
      newPosition.top = Math.max(0, Math.min(maxTop, newPosition.top))
      
      setLogoPosition(newPosition)
      setHasChanges(true)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Aumentar tamaño
  const handleIncreaseSize = () => {
    const newSize = Math.min(200, logoHeight + 5)
    setLogoHeight(newSize)
    setHasChanges(true)
  }

  // Disminuir tamaño
  const handleDecreaseSize = () => {
    const newSize = Math.max(20, logoHeight - 5)
    setLogoHeight(newSize)
    setHasChanges(true)
  }

  // Guardar posición y tamaño
  const handleSave = async () => {
    // Guardar en localStorage
    localStorage.setItem(LOGO_SIZE_KEY, logoHeight.toString())
    localStorage.setItem(LOGO_POSITION_KEY, JSON.stringify(logoPosition))
    
    // Actualizar los valores por defecto en el código
    try {
      const response = await fetch('/api/update-logo-defaults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          size: logoHeight,
          position: logoPosition
        })
      })
      
      if (response.ok) {
        setHasChanges(false)
        setSavedMessage(true)
        setTimeout(() => {
          setSavedMessage(false)
        }, 3000)
      } else {
        // Si falla la API, al menos guardamos en localStorage
        setHasChanges(false)
        setSavedMessage(true)
        setTimeout(() => {
          setSavedMessage(false)
        }, 3000)
      }
    } catch (error) {
      // Si hay error, al menos guardamos en localStorage
      setHasChanges(false)
      setSavedMessage(true)
      setTimeout(() => {
        setSavedMessage(false)
      }, 3000)
    }
  }

  return (
    <div
      ref={logoRef}
      style={{
        position: 'absolute',
        left: `${logoPosition.left}px`,
        top: `${logoPosition.top}px`,
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
        cursor: 'default',
        userSelect: 'none'
      }}
    >
      <Logo 
        className="w-auto" 
        style={{ 
          height: `${logoHeight}px`,
          maxHeight: `${logoHeight}px`,
          maxWidth: '300px',
          pointerEvents: 'none'
        }} 
      />
    </div>
  )
}

