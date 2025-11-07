'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { GL } from '@/components/gl'

export default function Home() {
  useEffect(() => {
    // Add styles to make widget match dark theme and be visible
    const style = document.createElement('style')
    style.id = 'domain-scanner-styles'
    style.textContent = `
      /* Target all possible widget containers */
      [data-id="pzbec9"],
      [data-id="pzbec9"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      .easydmarc-domain-scanner,
      div[data-easydmarc-widget],
      iframe[data-id="pzbec9"],
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
      [data-id="pzbec9"] h1,
      [data-id="pzbec9"] h2,
      [data-id="pzbec9"] h3,
      [data-id="pzbec9"] p,
      [data-id="pzbec9"] label,
      [data-id="pzbec9"] span,
      .easydmarc-widget h1,
      .easydmarc-widget h2,
      .easydmarc-widget h3,
      .easydmarc-widget p,
      .easydmarc-widget label,
      .easydmarc-widget span {
        color: #ffffff !important;
      }
      
      /* Style input fields for dark theme */
      [data-id="pzbec9"] input,
      [data-id="pzbec9"] textarea,
      .easydmarc-widget input,
      .easydmarc-widget textarea {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      
      [data-id="pzbec9"] input::placeholder,
      .easydmarc-widget input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
      
      /* Style buttons for dark theme */
      [data-id="pzbec9"] button,
      .easydmarc-widget button {
        background: #FFC700 !important;
        color: #000000 !important;
        border: none !important;
      }
      
      [data-id="pzbec9"] button:hover,
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

    // Start checking immediately and more frequently
    let checkInterval: NodeJS.Timeout | null = null
    
    // Check immediately
    findAndMoveWidget()
    
    // Then check periodically with shorter intervals
    checkInterval = setInterval(() => {
      const found = findAndMoveWidget()
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
      <Script
        id="easydmarc-domain-scanner"
        data-id="pzbec9"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InB6YmVjOSIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJmYWxzZSJ9LCJlZGl0aW9uIjoibXNwIiwiYmltaV9hY3RpdmF0aW9uIjoidHJ1ZSIsIm9yZ2FuaXphdGlvbiI6eyJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkiLCJkb21haW4iOiJzY2FuLm9uYm9hcmRpZ2l0YWwuY29tIn19LCJlbWJlZF92ZXJzaW9uIjoiMS4wLjAiLCJlbWJlZF9yZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9hcHBvaW50bWVudCIsImlhdCI6MTc2MjU0NjcwN30.LxLx2mwlVMLTY-wPisQUcfP51Cp8up4uLE2RBuAHETw"
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
      <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4">
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
