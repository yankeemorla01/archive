'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { Header } from '@/components/header'
import { SEOContent } from '@/components/seo-content'
import OnboardDigitalFeatures from '@/components/onboard-digital-features'
import GlobalPresenceMap from '@/components/global-presence-map'
import LogoTicker from '@/components/logo-ticker'
import { Footer } from '@/components/footer'

export default function Home() {
  const findAndMoveWidgetRef = useRef<(() => boolean) | null>(null)

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
        background: transparent !important;
        min-height: 350px !important;
      }
      
      /* Ensure container doesn't show black background */
      #domain-scanner-container:empty::before {
        content: '';
        display: block;
        width: 100%;
        min-height: 350px;
        background: transparent;
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
    const findAndMoveWidget = (): boolean => {
      const container = document.getElementById('domain-scanner-container')
      if (!container) {
        console.warn('Container not found')
        return false
      }
      
      // Log container state
      console.log('Container state:', {
        hasChildren: container.children.length > 0,
        innerHTML: container.innerHTML.substring(0, 100)
      })

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
            if (src && src.includes('referrer=') && src.includes('easydmarc.com')) {
              const currentHost = window.location.hostname
              const targetDomain = 'onboardigital.com'
              
              if (currentHost !== targetDomain && !currentHost.endsWith('.' + targetDomain)) {
                const modifiedSrc = src.replace(
                  /referrer=([^&]*)/,
                  (match, referrerValue) => {
                    try {
                      const decoded = decodeURIComponent(referrerValue)
                      const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain)
                      return 'referrer=' + encodeURIComponent(fixed)
                    } catch (e) {
                      return 'referrer=' + encodeURIComponent('https://' + targetDomain)
                    }
                  }
                )
                if (modifiedSrc !== src) {
                  iframe.src = modifiedSrc
                  console.log('Modified iframe referrer:', currentHost, '->', targetDomain)
                }
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
      let widgetFoundInDivs = false
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
            widgetFoundInDivs = true
            return true
          }
        }
      })
      
      if (widgetFoundInDivs) {
        return true
      }

      // Check for any iframe that might contain the widget
      const iframes = document.querySelectorAll('iframe')
      for (const iframe of iframes) {
        if (iframe.src.includes('easydmarc') || iframe.src.includes('domain-scanner')) {
          console.log(`Found widget iframe:`, iframe.src, iframe)
          
          // Modify referrer in iframe URL
          const src = iframe.src
          if (src && src.includes('referrer=') && src.includes('easydmarc.com')) {
            const currentHost = window.location.hostname
            const targetDomain = 'onboardigital.com'
            
            if (currentHost !== targetDomain && !currentHost.endsWith('.' + targetDomain)) {
              const modifiedSrc = src.replace(
                /referrer=([^&]*)/,
                (match, referrerValue) => {
                  try {
                    const decoded = decodeURIComponent(referrerValue)
                    const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain)
                    return 'referrer=' + encodeURIComponent(fixed)
                  } catch (e) {
                    return 'referrer=' + encodeURIComponent('https://' + targetDomain)
                  }
                }
              )
              if (modifiedSrc !== src) {
                iframe.src = modifiedSrc
                console.log('Modified iframe referrer in iframe search:', currentHost, '->', targetDomain)
              }
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

    // Store function in ref so it can be accessed outside useEffect
    findAndMoveWidgetRef.current = findAndMoveWidget

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
    const setupDomainCapture = (): boolean => {
      const container = document.getElementById('domain-scanner-container')
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

    // Function to fix iframe referrer - replace any domain with onboardigital.com
    const fixIframeReferrer = (iframe: HTMLIFrameElement) => {
      const src = iframe.src
      if (src && src.includes('referrer=') && src.includes('easydmarc.com')) {
        const currentHost = window.location.hostname
        const targetDomain = 'onboardigital.com'
        
        // Only fix if current domain is not the target domain
        if (currentHost !== targetDomain && !currentHost.endsWith('.' + targetDomain)) {
          const modifiedSrc = src.replace(
            /referrer=([^&]*)/,
            (match, referrerValue) => {
              try {
                const decoded = decodeURIComponent(referrerValue)
                // Replace any occurrence of current host with target domain
                const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain)
                return 'referrer=' + encodeURIComponent(fixed)
              } catch (e) {
                // If decoding fails, just replace the hostname in the URL
                return 'referrer=' + encodeURIComponent('https://' + targetDomain)
              }
            }
          )
          if (modifiedSrc !== src) {
            iframe.src = modifiedSrc
            console.log('Fixed iframe referrer via observer:', currentHost, '->', targetDomain)
          }
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
    let widgetFound = false
    
    // Check immediately
    const initialCheck = findAndMoveWidget()
    if (initialCheck) {
      widgetFound = true
      console.log('Widget found on initial check')
    } else {
      console.log('Widget not found on initial check, will keep searching...')
    }
    
    // Setup capture after widget is found
    const setupCaptureInterval = setInterval(() => {
      if (!captureSetup) {
        const result = setupDomainCapture()
        captureSetup = result === true
        if (captureSetup) {
          clearInterval(setupCaptureInterval)
        }
      }
    }, 500)
    
    // Then check periodically with shorter intervals
    checkInterval = setInterval(() => {
      const found = findAndMoveWidget()
      if (found && !widgetFound) {
        widgetFound = true
        console.log('Widget found during periodic check')
      }
      if (found && !captureSetup) {
        const result = setupDomainCapture()
        captureSetup = result === true
        if (captureSetup) {
          console.log('Domain capture setup completed')
        }
      }
      if (found && widgetFound && captureSetup) {
        if (checkInterval) {
          clearInterval(checkInterval)
          checkInterval = null
          console.log('Widget fully loaded and configured, stopping checks')
        }
      }
    }, 200)

    // Stop checking after 10 seconds
    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
        if (!widgetFound) {
          console.warn('Widget not found after 10 seconds. Check console for errors.')
          const container = document.getElementById('domain-scanner-container')
          if (container && container.children.length === 0) {
            container.innerHTML = '<div style="color: #ffffff; padding: 20px; text-align: center; background: rgba(255,255,255,0.1); border-radius: 8px;"><p>Widget is loading... If this persists, please refresh the page.</p></div>'
          }
        }
      }
      clearInterval(setupCaptureInterval)
    }, 10000)

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
              // This allows the widget to work on any subdomain by redirecting to onboardigital.com
              
              const targetDomain = 'onboardigital.com';
              const targetOrigin = 'https://' + targetDomain;
              
              // Method 1: Override hostname directly if possible
              try {
                const originalLocation = window.location;
                Object.defineProperty(originalLocation, 'hostname', {
                  get: function() { return targetDomain; },
                  configurable: true,
                  enumerable: true
                });
                Object.defineProperty(originalLocation, 'origin', {
                  get: function() { return targetOrigin; },
                  configurable: true,
                  enumerable: true
                });
              } catch(e) {
                // Silently fail - browser may protect this property
              }
              
              // Method 2: Override document.domain
              try {
                Object.defineProperty(document, 'domain', {
                  get: function() { return targetDomain; },
                  configurable: true
                });
              } catch(e) {
                // Silently fail
              }
              
              // Method 3: Intercept fetch calls to modify headers, referrer, and URL parameters
              const originalFetch = window.fetch;
              window.fetch = function(...args) {
                let url = args[0];
                const options = args[1] || {};
                
                if (typeof url === 'string' && url.includes('easydmarc.com')) {
                  // Replace current domain in URL with target domain
                  const currentHost = window.location.hostname;
                  if (currentHost !== targetDomain && !currentHost.endsWith('.' + targetDomain)) {
                    url = url.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                    // Also replace in URL parameters
                    url = url.replace(/referrer=([^&]*)/gi, (match, referrerValue) => {
                      try {
                        const decoded = decodeURIComponent(referrerValue);
                        const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        return 'referrer=' + encodeURIComponent(fixed);
                      } catch(e) {
                        return 'referrer=' + encodeURIComponent(targetOrigin);
                      }
                    });
                    url = url.replace(/domain=([^&]*)/gi, (match, domainValue) => {
                      try {
                        const decoded = decodeURIComponent(domainValue);
                        const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        return 'domain=' + encodeURIComponent(fixed);
                      } catch(e) {
                        return 'domain=' + encodeURIComponent(targetDomain);
                      }
                    });
                  }
                  
                  const headers = new Headers(options.headers || {});
                  headers.set('Referer', targetOrigin);
                  headers.set('Origin', targetOrigin);
                  headers.set('Referrer', targetOrigin);
                  
                  // Modify body if it's a string containing the domain
                  let body = options.body;
                  if (body && typeof body === 'string') {
                    try {
                      const bodyObj = JSON.parse(body);
                      if (bodyObj.domain || bodyObj.referrer || bodyObj.origin) {
                        if (bodyObj.domain) bodyObj.domain = bodyObj.domain.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        if (bodyObj.referrer) bodyObj.referrer = bodyObj.referrer.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        if (bodyObj.origin) bodyObj.origin = targetOrigin;
                        body = JSON.stringify(bodyObj);
                      }
                    } catch(e) {
                      // If not JSON, try string replacement
                      body = body.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                    }
                  }
                  
                  // Also modify referrerPolicy if present
                  if (options.referrerPolicy) {
                    options.referrerPolicy = 'origin';
                  }
                  
                  return originalFetch.apply(this, [
                    url,
                    { ...options, headers: headers, referrer: targetOrigin, body: body }
                  ]);
                }
                return originalFetch.apply(this, args);
              };
              
              // Method 4: Intercept XMLHttpRequest to modify headers, URL, and body
              const originalXHROpen = XMLHttpRequest.prototype.open;
              const originalXHRSend = XMLHttpRequest.prototype.send;
              const originalXHRSETRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
              
              XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                this._easydmarcUrl = url;
                this._easydmarcMethod = method;
                
                // Modify URL if it contains easydmarc.com
                if (typeof url === 'string' && url.includes('easydmarc.com')) {
                  const currentHost = window.location.hostname;
                  if (currentHost !== targetDomain && !currentHost.endsWith('.' + targetDomain)) {
                    let modifiedUrl = url.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                    // Replace in URL parameters
                    modifiedUrl = modifiedUrl.replace(/referrer=([^&]*)/gi, (match, referrerValue) => {
                      try {
                        const decoded = decodeURIComponent(referrerValue);
                        const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        return 'referrer=' + encodeURIComponent(fixed);
                      } catch(e) {
                        return 'referrer=' + encodeURIComponent(targetOrigin);
                      }
                    });
                    modifiedUrl = modifiedUrl.replace(/domain=([^&]*)/gi, (match, domainValue) => {
                      try {
                        const decoded = decodeURIComponent(domainValue);
                        const fixed = decoded.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        return 'domain=' + encodeURIComponent(fixed);
                      } catch(e) {
                        return 'domain=' + encodeURIComponent(targetDomain);
                      }
                    });
                    url = modifiedUrl;
                    this._easydmarcUrl = url;
                  }
                }
                
                return originalXHROpen.apply(this, [method, url, ...rest]);
              };
              
              XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
                if (this._easydmarcUrl && typeof this._easydmarcUrl === 'string' && this._easydmarcUrl.includes('easydmarc.com')) {
                  const currentHost = window.location.hostname;
                  // Replace domain in header values
                  if (typeof value === 'string') {
                    value = value.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                  }
                  // Override referrer-related headers
                  if (name.toLowerCase() === 'referer' || name.toLowerCase() === 'referrer') {
                    value = targetOrigin;
                  }
                  if (name.toLowerCase() === 'origin') {
                    value = targetOrigin;
                  }
                }
                return originalXHRSETRequestHeader.apply(this, [name, value]);
              };
              
              XMLHttpRequest.prototype.send = function(...args) {
                if (this._easydmarcUrl && typeof this._easydmarcUrl === 'string' && this._easydmarcUrl.includes('easydmarc.com')) {
                  const currentHost = window.location.hostname;
                  
                  // Set headers
                  this.setRequestHeader('Referer', targetOrigin);
                  this.setRequestHeader('Origin', targetOrigin);
                  this.setRequestHeader('Referrer', targetOrigin);
                  
                  // Modify body if present
                  if (args[0] && typeof args[0] === 'string') {
                    try {
                      const bodyObj = JSON.parse(args[0]);
                      if (bodyObj.domain || bodyObj.referrer || bodyObj.origin) {
                        if (bodyObj.domain) bodyObj.domain = bodyObj.domain.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        if (bodyObj.referrer) bodyObj.referrer = bodyObj.referrer.replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                        if (bodyObj.origin) bodyObj.origin = targetOrigin;
                        args[0] = JSON.stringify(bodyObj);
                      }
                    } catch(e) {
                      // If not JSON, try string replacement
                      args[0] = args[0].replace(new RegExp(currentHost.replace(/\./g, '\\.'), 'g'), targetDomain);
                    }
                  }
                }
                return originalXHRSend.apply(this, args);
              };
              
              // Method 5: Override document.referrer if possible
              try {
                Object.defineProperty(document, 'referrer', {
                  get: function() { return targetOrigin; },
                  configurable: true
                });
              } catch(e) {
                // Silently fail
              }
            })();
          `,
        }}
      />
      <Script
        id="easydmarc-domain-scanner"
        data-id="tp_oJdup5"
        data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjRkQ2MjYxIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiQW5hbHl6ZSBZb3VyIERvbWFpbuKAmXMgU2VjdXJpdHkiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBEb21haW4iLCJidXR0b25fMiI6IkluY3JlYXNlIFlvdXIgU2NvcmUiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9hcHBvaW50bWVudCIsImRlYWN0aXZlX3dpZGdldF9saW5rIjp0cnVlfX0sImlhdCI6MTc2MzU3NDQ5OX0.dKqkY-pDmXS20QkHpWbJw_7zPF3mHGFOu_-OQg4Jjr0"
        src="https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('EasyDMARC script loaded successfully')
          // Check immediately without delay
          const container = document.getElementById('domain-scanner-container')
          if (container) {
            console.log('Container found, searching for widget...')
            if (findAndMoveWidgetRef.current) {
              const found = findAndMoveWidgetRef.current()
              console.log('Widget search result:', found)
            }
            
            // Check again after a short delay
            setTimeout(() => {
              if (findAndMoveWidgetRef.current) {
                const found = findAndMoveWidgetRef.current()
                console.log('Widget search result (delayed):', found)
              }
            }, 100)
          } else {
            console.error('Container not found!')
          }
        }}
        onError={(e) => {
          console.error('Domain Scanner script error:', e)
          const container = document.getElementById('domain-scanner-container')
          if (container) {
            container.innerHTML = '<div style="color: white; padding: 20px; text-align: center;">Error loading scanner. Please refresh the page.</div>'
          }
        }}
      />
      {/* Hero Title Section - Above Everything */}
      <div className="relative w-full pt-40 sm:pt-44 md:pt-48 pb-6 md:pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight px-2">
            <span style={{ color: "#FD6262" }}>DMARC</span> Made Simple
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            Your one-stop solution for all things DMARC. Solve email security and deliverability issues in just a few clicks.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center px-3 sm:px-4">
        {/* Domain Scanner Container */}
        <div className="relative z-50 w-full max-w-5xl mb-6 md:mb-8" style={{ zIndex: 50 }}>
          <div 
            className="w-full min-h-[350px] sm:min-h-[400px]" 
            id="domain-scanner-container"
            style={{ 
              position: 'relative', 
              zIndex: 50,
              background: 'transparent',
              minHeight: '350px'
            }}
          />
        </div>
      </div>

      <LogoTicker />

      <div className="relative flex flex-col items-center px-4">
        {/* OnboardDigital Features Section - Will adapt spacing based on widget height */}
        <OnboardDigitalFeatures />
      </div>
      <SEOContent />
      <GlobalPresenceMap />
      <Footer />
    </>
  );
}
