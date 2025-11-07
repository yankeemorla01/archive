/**
 * Domain Scanner Embed Script
 * Purpose: Embeddable script to add Domain Scanner widget to any page
 * Usage: <script src="https://tu-dominio.com/domain-scanner-embed.js" data-container-id="domain-scanner-container"></script>
 * Last Updated: 2025-01-28
 */

(function() {
  'use strict';

  // Get configuration from script tag
  const currentScript = document.currentScript || document.querySelector('script[src*="domain-scanner-embed"]');
  const containerId = currentScript?.getAttribute('data-container-id') || 'domain-scanner-container';
  const widgetId = currentScript?.getAttribute('data-widget-id') || 'tp_WyEfcR';
  const widgetToken = currentScript?.getAttribute('data-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX1d5RWZjUiIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6ZmFsc2V9fSwiaWF0IjoxNzYyNTQ5MDAzfQ._pugQBwafW8IGbTKp1RNxFmUXsySZKGzrRjZnGLu39U';

  let widgetFound = false;

  // Create or get container
  function getOrCreateContainer() {
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.setAttribute('data-id', widgetId);
      container.style.cssText = 'position: relative; z-index: 50; width: 100%; min-height: 600px;';
      
      // Try to find a good place to insert it
      const targetElement = document.querySelector('main') || 
                           document.querySelector('body > div') || 
                           document.body;
      targetElement.appendChild(container);
    }
    return container;
  }

  // Add styles
  function addStyles() {
    const styleId = 'domain-scanner-embed-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Widget container styles */
      #${containerId} {
        position: relative !important;
        z-index: 50 !important;
        width: 100% !important;
        min-height: 600px !important;
      }
      
      /* Target the widget when it's created */
      [data-id="${widgetId}"],
      [data-id="${widgetId}"] > *,
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

  // Function to find and move widget to container
  function findAndMoveWidget() {
    if (widgetFound) return true;

    const container = getOrCreateContainer();
    if (!container) return false;

    const widgetSelectors = [
      `[data-id="${widgetId}"]`,
      '.easydmarc-widget',
      '.easydmarc-widget-container',
      'div[data-easydmarc-widget]',
      '#easydmarc-widget-container'
    ];

    for (const selector of widgetSelectors) {
      const widget = document.querySelector(selector);
      if (widget && widget !== container && widget.tagName !== 'SCRIPT') {
        // Check if widget contains the container (avoid hierarchy error)
        if (widget.contains(container)) {
          widgetFound = true;
          return true;
        }
        
        // Check if widget is already in container
        if (container.contains(widget)) {
          widgetFound = true;
          return true;
        }
        
        // Move widget to container
        container.appendChild(widget);
        widgetFound = true;
        return true;
      }
    }

    // Check if widget is already in container
    const widgetInContainer = container.querySelector(`[data-id="${widgetId}"], .easydmarc-widget`);
    if (widgetInContainer) {
      widgetFound = true;
      return true;
    }

    return false;
  }

  // Use MutationObserver to detect when widget is added to DOM
  function setupObserver() {
    const container = getOrCreateContainer();
    if (!container) return;

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
            
            if (isWidget && container && !container.contains(element)) {
              // Check if element contains the container (avoid hierarchy error)
              if (element.contains(container)) {
                widgetFound = true;
                return;
              }
              
              // Move widget to container
              container.appendChild(element);
              widgetFound = true;
            }
            
            // Also check for widget inside the added element
            const widgetInside = element.querySelector(`[data-id="${widgetId}"], .easydmarc-widget, .easydmarc-widget-container`);
            if (widgetInside && container && !container.contains(widgetInside)) {
              // Check if widgetInside contains the container (avoid hierarchy error)
              if (widgetInside.contains(container)) {
                widgetFound = true;
                return;
              }
              
              container.appendChild(widgetInside);
              widgetFound = true;
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
    
    // Create container
    getOrCreateContainer();
    
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
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

