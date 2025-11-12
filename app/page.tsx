'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { Header } from '@/components/header'
import { SEOContent } from '@/components/seo-content'

export default function Home() {
  useEffect(() => {
    // Add styles to make widget match dark theme and be visible
    const style = document.createElement('style')
    style.id = 'domain-scanner-styles'
    style.textContent = `
      /* Target all possible widget containers */
      [data-id="tp_oJdup5"],
      [data-id="tp_oJdup5"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      .easydmarc-domain-scanner,
      div[data-easydmarc-widget],
      iframe[data-id="tp_oJdup5"],
      #easydmarc-widget-container,
      #domain-scanner-container > * {
        background: transparent !important;
        max-width: 100% !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        position: relative !important;
        z-index: 100 !important;
      }
      
      #domain-scanner-container {
        z-index: 50 !important;
        position: relative !important;
      }
      
      /* Make widget text visible on dark background */
      [data-id="tp_oJdup5"] h1,
      [data-id="tp_oJdup5"] h2,
      [data-id="tp_oJdup5"] h3,
      [data-id="tp_oJdup5"] p,
      [data-id="tp_oJdup5"] label,
      [data-id="tp_oJdup5"] span,
      .easydmarc-widget h1,
      .easydmarc-widget h2,
      .easydmarc-widget h3,
      .easydmarc-widget p,
      .easydmarc-widget label,
      .easydmarc-widget span {
        color: #ffffff !important;
      }
      
      /* Style input fields for dark theme */
      [data-id="tp_oJdup5"] input,
      [data-id="tp_oJdup5"] textarea,
      .easydmarc-widget input,
      .easydmarc-widget textarea {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      
      [data-id="tp_oJdup5"] input::placeholder,
      .easydmarc-widget input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
      
      /* Style buttons for dark theme */
      [data-id="tp_oJdup5"] button,
      .easydmarc-widget button {
        background: #FFC700 !important;
        color: #000000 !important;
        border: none !important;
      }
      
      [data-id="tp_oJdup5"] button:hover,
      .easydmarc-widget button:hover {
        background: #ffd633 !important;
      }
    `
    
    // Check if style already exists
    if (!document.getElementById('domain-scanner-styles')) {
      document.head.appendChild(style)
    }

    // Function to find and move widget to container after it loads
    const findAndMoveWidget = () => {
      const container = document.getElementById('domain-scanner-container')
      if (!container) {
        console.log('Container not found')
        return false
      }

      // Skip script tags - we want the actual widget element
      const widgetSelectors = [
        '[data-id="tp_oJdup5"]',
        '.easydmarc-widget',
        '.easydmarc-widget-container',
        'div[data-easydmarc-widget]',
        '#easydmarc-widget-container',
        'iframe[src*="easydmarc"]',
        'div[id*="easydmarc"]',
        'div[class*="easydmarc"]',
        'div[class*="domain-scanner"]',
        'div[class*="scanner"]'
      ]

      // Look for divs that were added after page load (likely the widget)
      const allDivs = document.querySelectorAll('div')
      console.log('Searching for widget, total divs:', allDivs.length)

      // First try specific selectors
      for (const selector of widgetSelectors) {
        const widget = document.querySelector(selector)
        if (widget && widget.tagName !== 'SCRIPT') {
          console.log('Found widget with selector:', selector, widget)
          
          // If it's an iframe, modify the referrer in the URL
          if (widget.tagName === 'IFRAME') {
            const iframe = widget as HTMLIFrameElement
            const src = iframe.src
            if (src && src.includes('referrer=')) {
              // Replace scan.onboardigital.com with onboardigital.com in referrer
              const modifiedSrc = src.replace(
                /referrer=([^&]*)/,
                (match, referrerValue) => {
                  const decoded = decodeURIComponent(referrerValue)
                  const fixed = decoded.replace('scan.onboardigital.com', 'onboardigital.com')
                  return 'referrer=' + encodeURIComponent(fixed)
                }
              )
              if (modifiedSrc !== src) {
                iframe.src = modifiedSrc
                console.log('Modified iframe referrer')
              }
            }
          }
          
          // Check if widget already contains the container (avoid hierarchy error)
          if (widget.contains(container)) {
            console.log('Widget contains container, skipping move')
            return true
          }
          
          // Check if widget is already in container
          if (container.contains(widget)) {
            console.log('Widget already in container')
            return true
          }
          
          if (widget.parentElement !== container) {
            container.appendChild(widget)
            console.log('Widget moved to container')
            return true
          } else {
            console.log('Widget already in container')
            return true
          }
        }
      }

      // Look for divs that might be the widget (check for common widget patterns)
      allDivs.forEach((div, index) => {
        // Skip if it's our container or already in it
        if (div.id === 'domain-scanner-container' || div.closest('#domain-scanner-container')) {
          return
        }
        
        // Check for widget-like attributes or content
        const hasInput = div.querySelector('input[placeholder*="domain"], input[placeholder*="Domain"]')
        const hasScanButton = Array.from(div.querySelectorAll('button')).some(
          btn => btn.textContent?.toLowerCase().includes('scan')
        )
        const hasWidgetContent = 
          div.textContent?.includes('Domain Scanner') ||
          div.textContent?.includes('Scan a domain') ||
          div.textContent?.includes('Enter your domain') ||
          hasInput ||
          hasScanButton
        
        if (hasWidgetContent) {
          console.log('Found potential widget div:', div, div.className, div.id)
          
          // Check if div contains the container (avoid hierarchy error)
          if (div.contains(container)) {
            console.log('Widget div contains container, skipping move')
            return
          }
          
          // Check if div is already in container
          if (container.contains(div)) {
            console.log('Widget div already in container')
            return
          }
          
          if (div.parentElement !== container) {
            container.appendChild(div)
            console.log('Widget moved to container')
            return true
          }
        }
      })

      // Check for any iframe that might contain the widget
      const iframes = document.querySelectorAll('iframe')
      for (const iframe of iframes) {
        if (iframe.src.includes('easydmarc') || iframe.src.includes('domain-scanner')) {
          console.log(`Found widget iframe:`, iframe.src, iframe)
          
          // Modify referrer in iframe URL
          const src = iframe.src
          if (src && src.includes('referrer=')) {
            const modifiedSrc = src.replace(
              /referrer=([^&]*)/,
              (match, referrerValue) => {
                const decoded = decodeURIComponent(referrerValue)
                const fixed = decoded.replace('scan.onboardigital.com', 'onboardigital.com')
                return 'referrer=' + encodeURIComponent(fixed)
              }
            )
            if (modifiedSrc !== src) {
              iframe.src = modifiedSrc
              console.log('Modified iframe referrer in iframe search')
            }
          }
          
          // Check if iframe contains the container (avoid hierarchy error)
          if (iframe.contains(container)) {
            console.log('Widget iframe contains container, skipping move')
            continue
          }
          
          // Check if iframe is already in container
          if (container.contains(iframe)) {
            console.log('Widget iframe already in container')
            continue
          }
          
          if (iframe.parentElement !== container) {
            container.appendChild(iframe)
            console.log('Widget iframe moved to container')
            return true
          }
        }
      }

      return false
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
      const container = document.getElementById('domain-scanner-container')
      if (!container) return

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
        
        // Also search all buttons in container as fallback
        const allButtons = container.querySelectorAll('button')
        for (const button of allButtons) {
          if (button.textContent?.toLowerCase().includes('scan')) {
            return button as HTMLButtonElement
          }
        }
        
        return null
      }

      // Setup capture on input change
      const setupInputCapture = () => {
        const input = findInput()
        if (!input) return false

        // Remove existing listeners to avoid duplicates
        const newInput = input.cloneNode(true) as HTMLInputElement
        input.parentNode?.replaceChild(newInput, input)

        // Capture on blur (when user leaves the field)
        newInput.addEventListener('blur', () => {
          const domain = newInput.value?.trim()
          if (domain && domain.length > 0) {
            captureDomainData(domain)
          }
        })

        // Capture on Enter key
        newInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const domain = newInput.value?.trim()
            if (domain && domain.length > 0) {
              captureDomainData(domain)
            }
          }
        })

        return true
      }

      // Setup capture on button click
      const setupButtonCapture = () => {
        const button = findScanButton()
        if (!button) return false

        button.addEventListener('click', () => {
          const input = findInput()
          if (input) {
            const domain = input.value?.trim()
            if (domain && domain.length > 0) {
              captureDomainData(domain)
            }
          }
        })

        return true
      }

      // Try to setup capture
      const inputFound = setupInputCapture()
      const buttonFound = setupButtonCapture()

      return inputFound || buttonFound
    }

    // Function to fix iframe referrer
    const fixIframeReferrer = (iframe: HTMLIFrameElement) => {
      const src = iframe.src
      if (src && src.includes('referrer=') && src.includes('scan.onboardigital.com')) {
        const modifiedSrc = src.replace(
          /referrer=([^&]*)/,
          (match, referrerValue) => {
            const decoded = decodeURIComponent(referrerValue)
            const fixed = decoded.replace('scan.onboardigital.com', 'onboardigital.com')
            return 'referrer=' + encodeURIComponent(fixed)
          }
        )
        if (modifiedSrc !== src) {
          iframe.src = modifiedSrc
          console.log('Fixed iframe referrer via observer')
        }
      }
    }

    // Observer to catch iframes as they're created
    const iframeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            // Check if it's an iframe
            if (element.tagName === 'IFRAME') {
              fixIframeReferrer(element as HTMLIFrameElement)
            }
            // Check for iframes inside the added element
            const iframes = element.querySelectorAll('iframe')
            iframes.forEach((iframe) => {
              fixIframeReferrer(iframe)
            })
          }
        })
      })
    })

    // Observe the entire document for iframe creation
    iframeObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Start checking immediately and more frequently
    let checkInterval: NodeJS.Timeout | null = null
    let captureSetup = false
    
    // Check immediately
    findAndMoveWidget()
    
    // Setup capture after widget is found
    const setupCaptureInterval = setInterval(() => {
      if (!captureSetup) {
        captureSetup = setupDomainCapture()
        if (captureSetup) {
          clearInterval(setupCaptureInterval)
        }
      }
    }, 500)
    
    // Then check periodically with shorter intervals
    checkInterval = setInterval(() => {
      const found = findAndMoveWidget()
      if (found && !captureSetup) {
        captureSetup = setupDomainCapture()
      }
      if (found) {
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
        }
      }
    }, 200)

    // Stop checking after 6 seconds (reduced from 10)
    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
      }
      clearInterval(setupCaptureInterval)
    }, 6000)

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval)
      }
      iframeObserver.disconnect()
      const existingStyle = document.getElementById('domain-scanner-styles')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  return (
    <>
      <Header />
      {/* Script to override domain validation before EasyDMARC loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              'use strict';
              // Override domain validation for EasyDMARC widget
              // This allows the widget to work on scan.onboardigital.com
              
              const targetDomain = 'onboardigital.com';
              
              // Method 1: Override hostname directly if possible (silent)
              try {
                const originalLocation = window.location;
                Object.defineProperty(originalLocation, 'hostname', {
                  get: function() { return targetDomain; },
                  configurable: true,
                  enumerable: true
                });
              } catch(e) {
                // Silently fail - browser may protect this property
              }
              
              // Method 2: Override document.domain (silent)
              try {
                Object.defineProperty(document, 'domain', {
                  get: function() { return targetDomain; },
                  configurable: true
                });
              } catch(e) {
                // Silently fail
              }
              
              // Method 3: Intercept fetch/XHR calls to modify headers
              const originalFetch = window.fetch;
              window.fetch = function(...args) {
                const url = args[0];
                if (typeof url === 'string' && url.includes('easydmarc.com')) {
                  // Modify headers to include correct domain
                  const options = args[1] || {};
                  const headers = new Headers(options.headers || {});
                  headers.set('Referer', 'https://' + targetDomain);
                  headers.set('Origin', 'https://' + targetDomain);
                  
                  return originalFetch.apply(this, [
                    url,
                    { ...options, headers: headers }
                  ]);
                }
                return originalFetch.apply(this, args);
              };
              
              // Method 4: Intercept XMLHttpRequest if used
              const originalXHROpen = XMLHttpRequest.prototype.open;
              XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                if (typeof url === 'string' && url.includes('easydmarc.com')) {
                  // Modify URL or headers if needed
                }
                return originalXHROpen.apply(this, [method, url, ...rest]);
              };
            })();
          `,
        }}
      />
      <Script
        id="easydmarc-domain-scanner"
        data-id="tp_oJdup5"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6dHJ1ZX19LCJpYXQiOjE3NjI1NTM0NDd9.xRru61CTu5bXvfbGfdutYti3m5i_PIvN5IH-evdCIsk"
        src="/api/easydmarc-proxy"
        strategy="afterInteractive"
        onLoad={() => {
          // Check immediately without delay
          const container = document.getElementById('domain-scanner-container')
          if (container) {
            findAndMoveWidget()
            
            // Check again after a short delay
            setTimeout(() => {
              findAndMoveWidget()
            }, 100)
          }
        }}
        onError={(e) => {
          console.error('Domain Scanner script error:', e)
        }}
      />
      <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 pt-24 md:pt-32">
        <div className="relative z-50 w-full max-w-5xl" style={{ zIndex: 50 }}>
          <div 
            className="w-full min-h-[600px]" 
            id="domain-scanner-container"
            style={{ position: 'relative', zIndex: 50 }}
          />
        </div>
      </div>
      <SEOContent />
    </>
  );
}
