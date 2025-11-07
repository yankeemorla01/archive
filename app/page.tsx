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
      [data-id="tp_aWPt5A"],
      [data-id="tp_aWPt5A"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      .easydmarc-domain-scanner,
      div[data-easydmarc-widget],
      iframe[data-id="tp_aWPt5A"],
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
      [data-id="tp_aWPt5A"] h1,
      [data-id="tp_aWPt5A"] h2,
      [data-id="tp_aWPt5A"] h3,
      [data-id="tp_aWPt5A"] p,
      [data-id="tp_aWPt5A"] label,
      [data-id="tp_aWPt5A"] span,
      .easydmarc-widget h1,
      .easydmarc-widget h2,
      .easydmarc-widget h3,
      .easydmarc-widget p,
      .easydmarc-widget label,
      .easydmarc-widget span {
        color: #ffffff !important;
      }
      
      /* Style input fields for dark theme */
      [data-id="tp_aWPt5A"] input,
      [data-id="tp_aWPt5A"] textarea,
      .easydmarc-widget input,
      .easydmarc-widget textarea {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      
      [data-id="tp_aWPt5A"] input::placeholder,
      .easydmarc-widget input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
      
      /* Style buttons for dark theme */
      [data-id="tp_aWPt5A"] button,
      .easydmarc-widget button {
        background: #FFC700 !important;
        color: #000000 !important;
        border: none !important;
      }
      
      [data-id="tp_aWPt5A"] button:hover,
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
        data-id="tp_aWPt5A"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX2FXUHQ1QSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2NvbnRhY3QiLCJlbWJlZF92ZXJzaW9uIjoiMS4wLjAiLCJoZWlnaHQiOiJhdXRvIiwid2lkdGgiOiIxMDAlIiwib3B0aW9ucyI6eyJiaW1pX2FjdGl2YXRpb24iOnRydWUsIm9yZ2FuaXphdGlvbiI6eyJkb21haW4iOiJvbmJvYXJkaWdpdGFsLmNvbSIsIm9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSJ9LCJlZGl0aW9uIjoibXNwIiwic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiNGRkZGRkYiLCJ0aXRsZUNvbG9yIjoiIzFBMzM4MCIsInBhcmFncmFwaENvbG9yIjoiIzVBNUU3MiIsImJ1dHRvbnNDb2xvciI6IiMzMzY2RkYiLCJzaGFkb3dDaGVjayI6dHJ1ZSwic2hhZG93Q29sb3IiOiIjMzM2NkZGMjAiLCJ0aGVtZV9tb2RlIjoibGlnaHQifX0sImNvbnRlbnQiOnsidGl0bGUiOiJEb21haW4gU2Nhbm5lciIsInBhcmFncmFwaCI6IlNjYW4gYSBkb21haW4gdG8gZ2V0IGl0IGFuYWx5emVkIGZvciBwb3NzaWJsZSBpc3N1ZXMgd2l0aCBETUFSQywgU1BGLCBES0lNIGFuZCBCSU1JIHJlY29yZHMuIiwiYnV0dG9uXzEiOiJTY2FuIE5vdyIsImJ1dHRvbl8yIjoiSW5jcmVhc2UgU2NvcmUiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9jb250YWN0IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOnRydWV9fSwiaWF0IjoxNzYxNzg5ODczfQ.hQiVVhwpQ4rh7iUoqmJSbiIlDS3Z5n1zc7N5vMtGXW0"
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
