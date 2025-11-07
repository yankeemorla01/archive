'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GL } from '@/components/gl'
import { Header } from '@/components/header'

export default function Home() {
  useEffect(() => {
    // Add styles to make widget match dark theme and be visible
    const style = document.createElement('style')
    style.id = 'domain-scanner-styles'
    style.textContent = `
      /* Target all possible widget containers */
      [data-id="k7cnng"],
      [data-id="k7cnng"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      .easydmarc-domain-scanner,
      div[data-easydmarc-widget],
      iframe[data-id="k7cnng"],
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
      [data-id="k7cnng"] h1,
      [data-id="k7cnng"] h2,
      [data-id="k7cnng"] h3,
      [data-id="k7cnng"] p,
      [data-id="k7cnng"] label,
      [data-id="k7cnng"] span,
      .easydmarc-widget h1,
      .easydmarc-widget h2,
      .easydmarc-widget h3,
      .easydmarc-widget p,
      .easydmarc-widget label,
      .easydmarc-widget span {
        color: #ffffff !important;
      }
      
      /* Style input fields for dark theme */
      [data-id="k7cnng"] input,
      [data-id="k7cnng"] textarea,
      .easydmarc-widget input,
      .easydmarc-widget textarea {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      
      [data-id="k7cnng"] input::placeholder,
      .easydmarc-widget input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
      
      /* Style buttons for dark theme */
      [data-id="k7cnng"] button,
      .easydmarc-widget button {
        background: #FFC700 !important;
        color: #000000 !important;
        border: none !important;
      }
      
      [data-id="k7cnng"] button:hover,
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
        '[data-id="k7cnng"]',
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
        const hasWidgetContent = 
          div.textContent?.includes('Domain Scanner') ||
          div.textContent?.includes('Scan a domain') ||
          div.textContent?.includes('Enter your domain') ||
          div.querySelector('input[placeholder*="domain"]') ||
          div.querySelector('button:contains("Scan")')
        
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
          '[data-id="k7cnng"] input[type="text"]',
          '[data-id="k7cnng"] input[type="email"]',
          '[data-id="k7cnng"] input[placeholder*="domain"]',
          '[data-id="k7cnng"] input[placeholder*="Domain"]',
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
          '[data-id="k7cnng"] button',
          '.easydmarc-widget button',
          'button:contains("Scan")',
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
      const existingStyle = document.getElementById('domain-scanner-styles')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  return (
    <>
      <Header />
      <Script
        id="easydmarc-domain-scanner"
        data-id="k7cnng"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ims3Y25uZyIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoiZmFsc2UiLCJ0aGVtZV9tb2RlIjoiZGFyayJ9fSwiY29udGVudCI6eyJ0aXRsZSI6IkRvbWFpbiBTY2FubmVyIiwicGFyYWdyYXBoIjoiIiwiYnV0dG9uXzEiOiJTY2FuIE5vdyIsImJ1dHRvbl8yIjoiSW5jcmVhc2UgU2NvcmUiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9hcHBvaW50bWVudCIsImRlYWN0aXZlX3dpZGdldF9saW5rIjoiZmFsc2UifSwiZWRpdGlvbiI6Im1zcCIsImJpbWlfYWN0aXZhdGlvbiI6InRydWUiLCJvcmdhbml6YXRpb24iOnsib2JqZWN0SWQiOiJvcmdfNjgwMmQ3YTk0NTU2MDFjOTFjMDYyNjU5IiwiZG9tYWluIjoic2Nhbi5vbmJvYXJkaWdpdGFsLmNvbSJ9fSwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiZW1iZWRfcmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJpYXQiOjE3NjI1NTI5MzV9.9wmwGI9ZMrVOCX2al010e10szCSM3LUQ9sd0aBEhKlM"
        src="https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0"
        strategy="beforeInteractive"
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
        <GL hovering={false} />
        <div className="relative z-50 w-full max-w-5xl" style={{ zIndex: 50 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient text-center mb-12 text-foreground">
            Scan your website for free
          </h1>
          <div 
            className="w-full min-h-[600px]" 
            id="domain-scanner-container"
            style={{ position: 'relative', zIndex: 50 }}
          />
        </div>
      </div>
    </>
  );
}
