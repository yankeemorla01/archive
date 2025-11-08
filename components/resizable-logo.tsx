'use client'

import { useState, useEffect, useRef } from 'react'
import { Logo } from './logo'

const LOGO_SIZE_KEY = 'onboardigital-logo-size'
const LOGO_POSITION_KEY = 'onboardigital-logo-position'
const LOGO_LOCKED_KEY = 'onboardigital-logo-locked'

// Valores por defecto guardados para producción (Vercel)
// Estos valores se usarán si no hay valores en localStorage
const DEFAULT_LOGO_SIZE = 80 // Tamaño final configurado
const DEFAULT_LOGO_POSITION = { left: 60, top: 0 } // Posición final (ajustar si es necesario)

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

const getInitialLocked = () => {
  if (typeof window !== 'undefined') {
    const locked = localStorage.getItem(LOGO_LOCKED_KEY)
    return locked === 'true'
  }
  return false
}

export const ResizableLogo = () => {
  const [logoHeight, setLogoHeight] = useState(getInitialSize)
  const [logoPosition, setLogoPosition] = useState(getInitialPosition)
  const [isLocked, setIsLocked] = useState(getInitialLocked)
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const startYRef = useRef(0)
  const startHeightRef = useRef(0)
  const startDragPosRef = useRef({ x: 0, y: 0 })

  // Cargar valores guardados al montar
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

    const locked = localStorage.getItem(LOGO_LOCKED_KEY)
    if (locked === 'true') {
      setIsLocked(true)
    }
  }, [])

  // Guardar tamaño cuando cambia (solo si no está bloqueado)
  useEffect(() => {
    if (!isLocked && typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOGO_SIZE_KEY, logoHeight.toString())
        console.log('💾 Tamaño guardado:', logoHeight, 'px')
      } catch (e) {
        console.error('Error guardando tamaño:', e)
      }
    }
  }, [logoHeight, isLocked])

  // Guardar posición cuando cambia (solo si no está bloqueado)
  useEffect(() => {
    if (!isLocked && typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOGO_POSITION_KEY, JSON.stringify(logoPosition))
        console.log('💾 Posición guardada:', logoPosition)
      } catch (e) {
        console.error('Error guardando posición:', e)
      }
    }
  }, [logoPosition, isLocked])

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    startYRef.current = e.clientY
    startHeightRef.current = logoHeight
  }

  const handleDragMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return
    e.preventDefault()
    setIsDragging(true)
    startDragPosRef.current = {
      x: e.clientX - logoPosition.left,
      y: e.clientY - logoPosition.top
    }
  }

  const handleLock = () => {
    // Guardar valores finales
    const finalSize = logoHeight.toString()
    const finalPosition = JSON.stringify(logoPosition)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOGO_SIZE_KEY, finalSize)
      localStorage.setItem(LOGO_POSITION_KEY, finalPosition)
      localStorage.setItem(LOGO_LOCKED_KEY, 'true')
    }
    
    setIsLocked(true)
    
    // Confirmación en consola para verificar
    console.log('✅ Logo guardado permanentemente:')
    console.log('   Tamaño:', finalSize, 'px')
    console.log('   Posición:', finalPosition)
  }

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOGO_LOCKED_KEY, 'false')
    }
    setIsLocked(false)
    console.log('🔓 Logo desbloqueado - puedes ajustarlo de nuevo')
  }

  // Efecto para redimensionar
  useEffect(() => {
    if (!isResizing || isLocked) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY
      const newHeight = Math.max(10, Math.min(90, startHeightRef.current + deltaY))
      setLogoHeight(newHeight)
    }

    const handleMouseUp = (e: MouseEvent) => {
      setIsResizing(false)
      // El useEffect ya guardará automáticamente cuando logoHeight cambie
      // Pero forzamos un guardado adicional aquí para asegurar
      setTimeout(() => {
        if (!isLocked && typeof window !== 'undefined') {
          try {
            const saved = localStorage.getItem(LOGO_SIZE_KEY)
            console.log('💾 Verificación - Tamaño en localStorage:', saved)
          } catch (e) {
            console.error('Error verificando tamaño:', e)
          }
        }
      }, 100)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, isLocked])

  // Efecto para arrastrar
  useEffect(() => {
    if (!isDragging || isLocked) return

    const handleMouseMove = (e: MouseEvent) => {
      const newLeft = e.clientX - startDragPosRef.current.x
      const newTop = e.clientY - startDragPosRef.current.y
      
      const maxLeft = window.innerWidth - 300
      const constrainedLeft = Math.max(60, Math.min(maxLeft, newLeft))
      const constrainedTop = Math.max(0, Math.min(90 - logoHeight, newTop))
      
      setLogoPosition({ left: constrainedLeft, top: constrainedTop })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, logoHeight, isLocked])


  return (
    <div
      style={{
        position: 'absolute',
        left: `${logoPosition.left}px`,
        top: `${logoPosition.top}px`,
        display: 'flex',
        alignItems: 'center',
        maxHeight: '90px',
        cursor: isLocked ? 'default' : (isDragging ? 'grabbing' : showControls ? 'grab' : 'default'),
        transition: isDragging || isResizing ? 'none' : 'left 0.1s ease, top 0.1s ease',
        zIndex: 1000
      }}
      onMouseEnter={() => !isLocked && setShowControls(true)}
      onMouseLeave={() => !isDragging && !isResizing && setShowControls(false)}
      onMouseDown={handleDragMouseDown}
    >
      <div
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          position: 'relative',
          pointerEvents: isDragging ? 'none' : 'auto'
        }}
        onClick={(e) => {
          if (isDragging || isResizing) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        <Logo 
          className="w-auto" 
          style={{ 
            height: `${logoHeight}px`,
            maxHeight: `${logoHeight}px`,
            maxWidth: '300px',
            transition: isResizing ? 'none' : 'height 0.2s ease',
            userSelect: 'none'
          }} 
        />
        
        {showControls && !isLocked && (
          <>
            {/* Control de redimensionamiento */}
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
                zIndex: 1001
              }}
              onMouseDown={handleResizeMouseDown}
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
            
            {/* Botón para guardar y bloquear */}
            <button
              onClick={handleLock}
              style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                color: '#fff',
                background: '#FD6262',
                padding: '4px 12px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                zIndex: 1001,
                fontWeight: 500
              }}
            >
              Guardar posición
            </button>
            
            {/* Indicador de arrastre */}
            <div
              style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                color: '#fff',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '2px 6px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                zIndex: 1001,
                marginTop: '30px'
              }}
            >
              Arrastra para mover
            </div>
          </>
        )}

        {isLocked && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                color: '#4ade80',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '2px 6px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                zIndex: 1001
              }}
            >
              ✓ Posición guardada
            </div>
            <button
              onClick={handleUnlock}
              style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                color: '#fff',
                background: '#6b7280',
                padding: '2px 8px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                zIndex: 1001,
                marginTop: '15px'
              }}
            >
              Desbloquear
            </button>
          </>
        )}
      </div>
    </div>
  )
}

