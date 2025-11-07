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
      [data-id="641b98"],
      [data-id="641b98"] > *,
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
      [data-id="641b98"] iframe,
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
      '[data-id="641b98"]',
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
    const widgetInContainer = container.querySelector('[data-id="641b98"], .easydmarc-widget')
    if (widgetInContainer) {
      scriptLoadedRef.current = true
    }
  }

  // Function to capture domain data from widget
  const captureDomainData = async (domain: string) => {
    try {
      const data = {
        domain,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pageUrl: window.location.href
      }

      // Send to API endpoint
      const response = await fetch('/api/capture-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Domain captured successfully:', result)
      } else {
        console.error('Failed to capture domain:', response.statusText)
      }
    } catch (error) {
      console.error('Error capturing domain:', error)
    }
  }

  // Function to setup domain capture listeners
  const setupDomainCapture = () => {
    const container = containerRef.current
    if (!container) return false

    // Find input field in widget
    const findInput = () => {
        const selectors = [
          '[data-id="641b98"] input[type="text"]',
          '[data-id="641b98"] input[type="email"]',
          '[data-id="641b98"] input[placeholder*="domain"]',
          '[data-id="641b98"] input[placeholder*="Domain"]',
        '.easydmarc-widget input[type="text"]',
        '.easydmarc-widget input[type="email"]',
        '.easydmarc-widget input[placeholder*="domain"]',
        '.easydmarc-widget input[placeholder*="Domain"]'
      ]

      for (const selector of selectors) {
        const input = container.querySelector(selector) as HTMLInputElement
        if (input) return input
      }
      return null
    }

    // Find scan button
    const findScanButton = () => {
        const selectors = [
          '[data-id="641b98"] button',
          '.easydmarc-widget button',
        'button[type="submit"]'
      ]

      for (const selector of selectors) {
        const buttons = container.querySelectorAll(selector)
        for (const button of buttons) {
          if (button.textContent?.toLowerCase().includes('scan')) {
            return button as HTMLButtonElement
          }
        }
      }
      return null
    }

    // Setup capture on input change
    const setupInputCapture = () => {
      const input = findInput()
      if (!input) return false

      // Check if already has listener
      if ((input as any).__captureSetup) return true

      // Capture on blur (when user leaves the field)
      input.addEventListener('blur', () => {
        const domain = input.value?.trim()
        if (domain && domain.length > 0) {
          captureDomainData(domain)
        }
      })

      // Capture on Enter key
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const domain = input.value?.trim()
          if (domain && domain.length > 0) {
            captureDomainData(domain)
          }
        }
      })

      ;(input as any).__captureSetup = true
      return true
    }

    // Setup capture on button click
    const setupButtonCapture = () => {
      const button = findScanButton()
      if (!button) return false

      // Check if already has listener
      if ((button as any).__captureSetup) return true

      button.addEventListener('click', () => {
        const input = findInput()
        if (input) {
          const domain = input.value?.trim()
          if (domain && domain.length > 0) {
            captureDomainData(domain)
          }
        }
      })

      ;(button as any).__captureSetup = true
      return true
    }

    // Try to setup capture
    const inputFound = setupInputCapture()
    const buttonFound = setupButtonCapture()

    return inputFound || buttonFound
  }

  // Use MutationObserver to detect when widget is added to DOM and move it to container
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let captureSetup = false

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            
            // Check if the added element is the widget
            const isWidget = 
              element.getAttribute('data-id') === '641b98' ||
              element.classList.contains('easydmarc-widget') ||
              element.classList.contains('easydmarc-widget-container') ||
              element.querySelector('[data-id="641b98"], .easydmarc-widget')
            
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
              
              // Setup capture after widget is moved
              if (!captureSetup) {
                setTimeout(() => {
                  captureSetup = setupDomainCapture()
                }, 500)
              }
            }
            
            // Also check for widget inside the added element
            const widgetInside = element.querySelector('[data-id="641b98"], .easydmarc-widget, .easydmarc-widget-container')
            if (widgetInside && container && !container.contains(widgetInside)) {
              // Check if widgetInside contains the container (avoid hierarchy error)
              if (widgetInside.contains(container)) {
                console.log('Widget inside element contains container, skipping move')
                scriptLoadedRef.current = true
                return
              }
              
              container.appendChild(widgetInside)
              scriptLoadedRef.current = true
              
              // Setup capture after widget is moved
              if (!captureSetup) {
                setTimeout(() => {
                  captureSetup = setupDomainCapture()
                }, 500)
              }
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

    // Also try to setup capture periodically
    const captureInterval = setInterval(() => {
      if (!captureSetup) {
        captureSetup = setupDomainCapture()
        if (captureSetup) {
          clearInterval(captureInterval)
        }
      }
    }, 1000)

    return () => {
      observer.disconnect()
      clearInterval(captureInterval)
    }
  }, [])

  return (
    <>
      <Script
        id="easydmarc-domain-scanner-iframe"
        data-id="641b98"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWI5OCIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJ0cnVlIn0sImVkaXRpb24iOiJtc3AiLCJiaW1pX2FjdGl2YXRpb24iOiJ0cnVlIiwib3JnYW5pemF0aW9uIjp7Im9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSIsImRvbWFpbiI6InNjYW4ub25ib2FyZGlnaXRhbC5jb20ifX0sImVtYmVkX3ZlcnNpb24iOiIxLjAuMCIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiaWF0IjoxNzYyNTUzMzYyfQ.wZfNt3v8ttrSayOKoODKxkbBAH_maWkwQv_0etm7swA"
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
        data-id="641b98"
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

