'use client'

import { useMemo, useState, useEffect } from 'react'

/**
 * Domain Scanner Iframe Component
 * Purpose: Embed the EasyDMARC domain scanner widget as an iframe
 * Last Updated: 2025-01-28
 * Author: System
 */

interface DomainScannerIframeProps {
  /**
   * Width of the iframe (default: '100%')
   */
  width?: string | number
  /**
   * Height of the iframe (default: 'auto' or '600px')
   */
  height?: string | number
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether to show border (default: false)
   */
  showBorder?: boolean
  /**
   * Border radius in pixels (default: 8)
   */
  borderRadius?: number
}

export function DomainScannerIframe({
  width = '100%',
  height = 'auto',
  className = '',
  showBorder = false,
  borderRadius = 8,
}: DomainScannerIframeProps) {
  const [iframeSrc, setIframeSrc] = useState('/domain-scanner')

  useEffect(() => {
    // Set the full URL only on the client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      setIframeSrc(`${window.location.origin}/domain-scanner`)
    }
  }, [])

  const iframeStyle = useMemo(() => {
    const baseStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      border: showBorder ? '1px solid #e5e7eb' : 'none',
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      display: 'block',
    }

    if (height === 'auto') {
      baseStyle.minHeight = '600px'
      baseStyle.height = '100vh'
    } else {
      baseStyle.height = typeof height === 'number' ? `${height}px` : height
    }

    return baseStyle
  }, [width, height, showBorder, borderRadius])

  return (
    <iframe
      src={iframeSrc}
      style={iframeStyle}
      className={className}
      title="Domain Scanner"
      allow="clipboard-read; clipboard-write"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      loading="lazy"
    />
  )
}

