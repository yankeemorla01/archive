/**
 * OnBoarding Digital - Domain Scanner Embed Script
 * Purpose: Script embebible que copia la página completa del Domain Scanner
 * Usage: <script src="https://scan.onboardigital.com/onboarding-digital-embed.js"></script>
 * Last Updated: 2025-01-28
 * Author: System
 */

(function() {
  'use strict';

  // Get configuration from script tag
  const currentScript = document.currentScript || document.querySelector('script[src*="onboarding-digital-embed"]');
  const containerId = currentScript?.getAttribute('data-container-id') || 'onboarding-digital-scanner';
  const widgetId = currentScript?.getAttribute('data-widget-id') || '641b98';
  const widgetToken = currentScript?.getAttribute('data-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWI5OCIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJ0cnVlIn0sImVkaXRpb24iOiJtc3AiLCJiaW1pX2FjdGl2YXRpb24iOiJ0cnVlIiwib3JnYW5pemF0aW9uIjp7Im9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSIsImRvbWFpbiI6InNjYW4ub25ib2FyZGlnaXRhbC5jb20ifX0sImVtYmVkX3ZlcnNpb24iOiIxLjAuMCIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiaWF0IjoxNzYyNTUzMzYyfQ.wZfNt3v8ttrSayOKoODKxkbBAH_maWkwQv_0etm7swA';

  let widgetFound = false;
  let captureSetup = false;

  // Function to capture domain data
  function captureDomainData(domain) {
    try {
      const data = {
        domain: domain.trim().toLowerCase(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        pageUrl: window.location.href
      };

      // Send to API endpoint
      fetch('https://scan.onboardigital.com/api/capture-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          console.log('Domain captured successfully');
        } else {
          console.error('Failed to capture domain');
        }
      })
      .catch(error => {
        console.error('Error capturing domain:', error);
      });
    } catch (error) {
      console.error('Error capturing domain:', error);
    }
  }

  // Create complete page container
  function createPageContainer() {
    let container = document.getElementById(containerId);
    if (container) {
      return container;
    }

    container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('data-onboarding-digital', 'true');
    
    // Create the complete page structure
    container.innerHTML = `
      <div class="onboarding-digital-wrapper" style="position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 1rem; padding-top: 6rem;">
        <div class="onboarding-digital-content" style="position: relative; z-index: 50; width: 100%; max-width: 80rem; margin: 0 auto;">
          <h1 class="onboarding-digital-title" style="font-size: 2.5rem; line-height: 1.2; text-align: center; margin-bottom: 3rem; color: #ffffff; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            Scan your website for free
          </h1>
          <div id="${containerId}-widget" class="onboarding-digital-widget-container" style="width: 100%; min-height: 600px; position: relative; z-index: 50;"></div>
        </div>
      </div>
    `;

    // Try to find a good place to insert it
    const targetElement = document.querySelector('main') || 
                         document.querySelector('body > div') || 
                         document.body;
    targetElement.appendChild(container);

    return container;
  }

  // Add complete styles
  function addStyles() {
    const styleId = 'onboarding-digital-embed-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Main container styles */
      #${containerId} {
        position: relative !important;
        width: 100% !important;
        min-height: 100vh !important;
        background: transparent !important;
      }

      .onboarding-digital-wrapper {
        position: relative !important;
        min-height: 100vh !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 3rem 1rem !important;
        padding-top: 6rem !important;
      }

      .onboarding-digital-content {
        position: relative !important;
        z-index: 50 !important;
        width: 100% !important;
        max-width: 80rem !important;
        margin: 0 auto !important;
      }

      .onboarding-digital-title {
        font-size: 2.5rem !important;
        line-height: 1.2 !important;
        text-align: center !important;
        margin-bottom: 3rem !important;
        color: #ffffff !important;
        font-weight: 400 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
      }

      @media (min-width: 640px) {
        .onboarding-digital-title {
          font-size: 3rem !important;
        }
      }

      @media (min-width: 768px) {
        .onboarding-digital-title {
          font-size: 3.75rem !important;
        }
      }

      .onboarding-digital-widget-container {
        width: 100% !important;
        min-height: 600px !important;
        position: relative !important;
        z-index: 50 !important;
      }
      
      /* Widget styles */
      [data-id="${widgetId}"],
      [data-id="${widgetId}"] > *,
      .easydmarc-widget,
      .easydmarc-widget-container,
      div[data-easydmarc-widget],
      #easydmarc-widget-container,
      #${containerId}-widget > * {
        background: transparent !important;
        max-width: 100% !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
        position: relative !important;
        z-index: 100 !important;
      }
      
      /* Make widget text visible on dark background */
      [data-id="${widgetId}"] h1,
      [data-id="${widgetId}"] h2,
      [data-id="${widgetId}"] h3,
      [data-id="${widgetId}"] p,
      [data-id="${widgetId}"] label,
      [data-id="${widgetId}"] span,
      .easydmarc-widget h1,
      .easydmarc-widget h2,
      .easydmarc-widget h3,
      .easydmarc-widget p,
      .easydmarc-widget label,
      .easydmarc-widget span {
        color: #ffffff !important;
      }
      
      /* Style input fields for dark theme */
      [data-id="${widgetId}"] input,
      [data-id="${widgetId}"] textarea,
      .easydmarc-widget input,
      .easydmarc-widget textarea {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: #ffffff !important;
      }
      
      [data-id="${widgetId}"] input::placeholder,
      .easydmarc-widget input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
      
      /* Style buttons for dark theme */
      [data-id="${widgetId}"] button,
      .easydmarc-widget button {
        background: #FFC700 !important;
        color: #000000 !important;
        border: none !important;
      }
      
      [data-id="${widgetId}"] button:hover,
      .easydmarc-widget button:hover {
        background: #ffd633 !important;
      }
      
      /* Ensure iframe within widget is visible */
      [data-id="${widgetId}"] iframe,
      .easydmarc-widget iframe {
        width: 100% !important;
        border: none !important;
        display: block !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Setup domain capture
  function setupDomainCapture() {
    if (captureSetup) return false;

    const widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return false;

    // Find input field in widget
    function findInput() {
      const selectors = [
        `[data-id="${widgetId}"] input[type="text"]`,
        `[data-id="${widgetId}"] input[type="email"]`,
        `[data-id="${widgetId}"] input[placeholder*="domain"]`,
        `[data-id="${widgetId}"] input[placeholder*="Domain"]`,
        '.easydmarc-widget input[type="text"]',
        '.easydmarc-widget input[type="email"]',
        '.easydmarc-widget input[placeholder*="domain"]',
        '.easydmarc-widget input[placeholder*="Domain"]'
      ];

      for (const selector of selectors) {
        const input = widgetContainer.querySelector(selector);
        if (input) return input;
      }
      return null;
    }

    // Find scan button
    function findScanButton() {
      const selectors = [
        `[data-id="${widgetId}"] button`,
        '.easydmarc-widget button',
        'button[type="submit"]'
      ];

      for (const selector of selectors) {
        const buttons = widgetContainer.querySelectorAll(selector);
        for (const button of buttons) {
          if (button.textContent && button.textContent.toLowerCase().includes('scan')) {
            return button;
          }
        }
      }
      return null;
    }

    // Setup input capture
    const input = findInput();
    if (input && !input.__captureSetup) {
      input.addEventListener('blur', function() {
        const domain = input.value ? input.value.trim() : '';
        if (domain && domain.length > 0) {
          captureDomainData(domain);
        }
      });

      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          const domain = input.value ? input.value.trim() : '';
          if (domain && domain.length > 0) {
            captureDomainData(domain);
          }
        }
      });

      input.__captureSetup = true;
    }

    // Setup button capture
    const button = findScanButton();
    if (button && !button.__captureSetup) {
      button.addEventListener('click', function() {
        const input = findInput();
        if (input) {
          const domain = input.value ? input.value.trim() : '';
          if (domain && domain.length > 0) {
            captureDomainData(domain);
          }
        }
      });

      button.__captureSetup = true;
    }

    if (input || button) {
      captureSetup = true;
      return true;
    }

    return false;
  }

  // Function to find and move widget to container
  function findAndMoveWidget() {
    if (widgetFound) return true;

    const widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return false;

    const widgetSelectors = [
      `[data-id="${widgetId}"]`,
      '.easydmarc-widget',
      '.easydmarc-widget-container',
      'div[data-easydmarc-widget]',
      '#easydmarc-widget-container'
    ];

    for (const selector of widgetSelectors) {
      const widget = document.querySelector(selector);
      if (widget && widget !== widgetContainer && widget.tagName !== 'SCRIPT') {
        // Check if widget contains the container (avoid hierarchy error)
        if (widget.contains(widgetContainer)) {
          widgetFound = true;
          setupDomainCapture();
          return true;
        }
        
        // Check if widget is already in container
        if (widgetContainer.contains(widget)) {
          widgetFound = true;
          setupDomainCapture();
          return true;
        }
        
        // Move widget to container
        widgetContainer.appendChild(widget);
        widgetFound = true;
        setupDomainCapture();
        return true;
      }
    }

    // Check if widget is already in container
    const widgetInContainer = widgetContainer.querySelector(`[data-id="${widgetId}"], .easydmarc-widget`);
    if (widgetInContainer) {
      widgetFound = true;
      setupDomainCapture();
      return true;
    }

    return false;
  }

  // Use MutationObserver to detect when widget is added to DOM
  function setupObserver() {
    const widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return;

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node;
            
            // Check if the added element is the widget
            const isWidget = 
              element.getAttribute('data-id') === widgetId ||
              element.classList.contains('easydmarc-widget') ||
              element.classList.contains('easydmarc-widget-container') ||
              element.querySelector(`[data-id="${widgetId}"], .easydmarc-widget`);
            
            if (isWidget && widgetContainer && !widgetContainer.contains(element)) {
              // Check if element contains the container (avoid hierarchy error)
              if (element.contains(widgetContainer)) {
                widgetFound = true;
                setupDomainCapture();
                return;
              }
              
              // Move widget to container
              widgetContainer.appendChild(element);
              widgetFound = true;
              setupDomainCapture();
            }
            
            // Also check for widget inside the added element
            const widgetInside = element.querySelector(`[data-id="${widgetId}"], .easydmarc-widget, .easydmarc-widget-container`);
            if (widgetInside && widgetContainer && !widgetContainer.contains(widgetInside)) {
              // Check if widgetInside contains the container (avoid hierarchy error)
              if (widgetInside.contains(widgetContainer)) {
                widgetFound = true;
                setupDomainCapture();
                return;
              }
              
              widgetContainer.appendChild(widgetInside);
              widgetFound = true;
              setupDomainCapture();
            }
          }
        });
      });
    });

    // Observe the entire document for widget creation
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Stop observing after 10 seconds
    setTimeout(function() {
      observer.disconnect();
    }, 10000);
  }

  // Load EasyDMARC script
  function loadWidgetScript() {
    // Check if script already exists
    if (document.querySelector(`script[data-id="${widgetId}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.setAttribute('data-id', widgetId);
    script.setAttribute('data-token', widgetToken);
    script.src = 'https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0';
    script.async = true;

    script.onload = function() {
      // Check immediately
      findAndMoveWidget();
      
      // Check again after a short delay
      setTimeout(function() {
        findAndMoveWidget();
      }, 100);
      
      // Continue checking periodically
      let attempts = 0;
      const maxAttempts = 15;
      const checkInterval = setInterval(function() {
        attempts++;
        findAndMoveWidget();
        
        if (widgetFound || attempts >= maxAttempts) {
          clearInterval(checkInterval);
        }
      }, 200);
    };

    script.onerror = function(e) {
      console.error('Domain Scanner script failed to load:', e);
    };

    document.body.appendChild(script);
  }

  // Initialize
  function init() {
    // Add styles first
    addStyles();
    
    // Create page container
    createPageContainer();
    
    // Setup observer
    setupObserver();
    
    // Start checking immediately
    findAndMoveWidget();
    
    // Load widget script
    loadWidgetScript();
    
    // Continue checking periodically
    let attempts = 0;
    const maxAttempts = 15;
    const checkInterval = setInterval(function() {
      attempts++;
      findAndMoveWidget();
      
      if (widgetFound || attempts >= maxAttempts) {
        clearInterval(checkInterval);
      }
    }, 200);

    // Try to setup capture periodically
    const captureInterval = setInterval(function() {
      if (!captureSetup) {
        setupDomainCapture();
        if (captureSetup) {
          clearInterval(captureInterval);
        }
      }
    }, 500);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

