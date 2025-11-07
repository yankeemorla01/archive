'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

/**
 * Domain Scanner Page
 * Purpose: Host the EasyDMARC domain scanner widget script for iframe embedding
 * Last Updated: 2025-01-28
 * Author: System
 */

export default function DomainScannerPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Add styles to ensure widget is visible and properly styled
    const style = document.createElement('style')
    style.id = 'domain-scanner-iframe-styles'
    style.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        overflow-x: hidden;
      }
      
      /* Widget container styles */
      #domain-scanner-widget-container {
        width: 100% !important;
        min-height: 600px !important;
        position: relative !important;
        background: transparent !important;
      }
      
      /* Target the widget when it's created */
      [data-id="pzbec9"],
      [data-id="pzbec9"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      div[data-easydmarc-widget],
      #easydmarc-widget-container {
        width: 100% !important;
        max-width: 100% !important;
        background: transparent !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
      }
      
      /* Ensure iframe within widget is visible */
      [data-id="pzbec9"] iframe,
      .easydmarc-widget iframe {
        width: 100% !important;
        border: none !important;
        display: block !important;
      }
    `
    
    if (!document.getElementById('domain-scanner-iframe-styles')) {
      document.head.appendChild(style)
    }

    return () => {
      const existingStyle = document.getElementById('domain-scanner-iframe-styles')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  // Function to check for widget after script loads
  const checkForWidget = () => {
    if (scriptLoadedRef.current) return
    
    const container = containerRef.current
    if (!container) return

    // Look for widget elements
    const widgetSelectors = [
      '[data-id="pzbec9"]',
      '.easydmarc-widget',
      '.easydmarc-widget-container',
      'div[data-easydmarc-widget]',
      '#easydmarc-widget-container'
    ]

    for (const selector of widgetSelectors) {
      const widget = document.querySelector(selector)
      if (widget && widget !== container) {
        // Check if widget contains the container (avoid hierarchy error)
        if (widget.contains(container)) {
          console.log('Widget contains container, skipping move')
          scriptLoadedRef.current = true
          return
        }
        
        // Check if widget is already in container
        if (container.contains(widget)) {
          scriptLoadedRef.current = true
          return
        }
        
        // Move widget to container if it's not already there
        container.appendChild(widget as Node)
        scriptLoadedRef.current = true
        return
      } else if (widget && container.contains(widget)) {
        scriptLoadedRef.current = true
        return
      }
    }

    // Check if widget is already in container
    const widgetInContainer = container.querySelector('[data-id="pzbec9"], .easydmarc-widget')
    if (widgetInContainer) {
      scriptLoadedRef.current = true
    }
  }

  // Use MutationObserver to detect when widget is added to DOM and move it to container
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            
            // Check if the added element is the widget
            const isWidget = 
              element.getAttribute('data-id') === 'pzbec9' ||
              element.classList.contains('easydmarc-widget') ||
              element.classList.contains('easydmarc-widget-container') ||
              element.querySelector('[data-id="pzbec9"], .easydmarc-widget')
            
            if (isWidget && container && !container.contains(element)) {
              // Check if element contains the container (avoid hierarchy error)
              if (element.contains(container)) {
                console.log('Widget element contains container, skipping move')
                scriptLoadedRef.current = true
                return
              }
              
              // Move widget to container
              container.appendChild(element)
              scriptLoadedRef.current = true
            }
            
            // Also check for widget inside the added element
            const widgetInside = element.querySelector('[data-id="pzbec9"], .easydmarc-widget, .easydmarc-widget-container')
            if (widgetInside && container && !container.contains(widgetInside)) {
              // Check if widgetInside contains the container (avoid hierarchy error)
              if (widgetInside.contains(container)) {
                console.log('Widget inside element contains container, skipping move')
                scriptLoadedRef.current = true
                return
              }
              
              container.appendChild(widgetInside)
              scriptLoadedRef.current = true
            }
          }
        })
      })
    })

    // Observe the entire document for widget creation
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Script
        id="easydmarc-domain-scanner-iframe"
        data-id="pzbec9"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InB6YmVjOSIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJmYWxzZSJ9LCJlZGl0aW9uIjoibXNwIiwiYmltaV9hY3RpdmF0aW9uIjoidHJ1ZSIsIm9yZ2FuaXphdGlvbiI6eyJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkiLCJkb21haW4iOiJzY2FuLm9uYm9hcmRpZ2l0YWwuY29tIn19LCJlbWJlZF92ZXJzaW9uIjoiMS4wLjAiLCJlbWJlZF9yZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9hcHBvaW50bWVudCIsImlhdCI6MTc2MjU0NjcwN30.LxLx2mwlVMLTY-wPisQUcfP51Cp8up4uLE2RBuAHETw"
        src="https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0"
        strategy="beforeInteractive"
        onLoad={() => {
          // Check immediately without delay
          checkForWidget()
          
          // Check again after a short delay to catch async rendering
          setTimeout(() => {
            checkForWidget()
          }, 100)
          
          // Continue checking periodically but more frequently
          let attempts = 0
          const maxAttempts = 15
          const checkInterval = setInterval(() => {
            attempts++
            checkForWidget()
            
            if (scriptLoadedRef.current || attempts >= maxAttempts) {
              clearInterval(checkInterval)
            }
          }, 200)
        }}
        onError={(e) => {
          console.error('Domain Scanner script failed to load:', e)
        }}
      />
      
      {/* Container with data-id - EasyDMARC widget may look for this */}
      <div 
        id="domain-scanner-widget-container"
        data-id="pzbec9"
        ref={containerRef}
        className="w-full min-h-[600px]"
        style={{ 
          position: 'relative',
          background: 'transparent',
          padding: '1rem'
        }}
      />
    </>
  )
}

