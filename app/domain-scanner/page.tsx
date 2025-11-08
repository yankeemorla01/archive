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
      [data-id="tp_oJdup5"],
      [data-id="tp_oJdup5"] > *,
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
      [data-id="tp_oJdup5"] iframe,
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
      '[data-id="tp_oJdup5"]',
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
    const widgetInContainer = container.querySelector('[data-id="tp_oJdup5"], .easydmarc-widget')
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
          '[data-id="tp_oJdup5"] input[type="text"]',
          '[data-id="tp_oJdup5"] input[type="email"]',
          '[data-id="tp_oJdup5"] input[placeholder*="domain"]',
          '[data-id="tp_oJdup5"] input[placeholder*="Domain"]',
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
          '[data-id="tp_oJdup5"] button',
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
              element.getAttribute('data-id') === 'tp_oJdup5' ||
              element.classList.contains('easydmarc-widget') ||
              element.classList.contains('easydmarc-widget-container') ||
              element.querySelector('[data-id="tp_oJdup5"], .easydmarc-widget')
            
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
            const widgetInside = element.querySelector('[data-id="tp_oJdup5"], .easydmarc-widget, .easydmarc-widget-container')
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
        data-id="tp_oJdup5"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6dHJ1ZX19LCJpYXQiOjE3NjI1NTM0NDd9.xRru61CTu5bXvfbGfdutYti3m5i_PIvN5IH-evdCIsk"
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
        data-id="tp_oJdup5"
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

