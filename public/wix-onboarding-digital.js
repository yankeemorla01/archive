/**
 * Wix OnBoarding Digital - Domain Scanner Embed Script
 * Purpose: Script compatible con Wix que copia la página completa del Domain Scanner
 * Usage: <script data-id="641b98" data-token="..." src="https://scan.onboardigital.com/wix-onboarding-digital.js"></script>
 * Last Updated: 2025-01-28
 * Author: System
 */

(function() {
  'use strict';

  // Get configuration from script tag (similar to original format)
  const currentScript = document.currentScript || document.querySelector('script[src*="wix-onboarding-digital"]');
  const widgetId = currentScript?.getAttribute('data-id') || 'tp_oJdup5';
  const widgetToken = currentScript?.getAttribute('data-token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6dHJ1ZX19LCJpYXQiOjE3NjI1NTM0NDd9.xRru61CTu5bXvfbGfdutYti3m5i_PIvN5IH-evdCIsk';
  const containerId = 'wix-onboarding-scanner-' + widgetId;

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

      fetch('https://scan.onboardigital.com/api/capture-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(function() {});
    } catch (e) {}
  }

  // Create complete page structure
  function createPage() {
    if (document.getElementById(containerId)) return;

    var container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('data-wix-scanner', 'true');
    
    container.innerHTML = '<div style="position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;padding-top:6rem"><div style="position:relative;z-index:50;width:100%;max-width:80rem;margin:0 auto"><h1 style="font-size:2.5rem;line-height:1.2;text-align:center;margin-bottom:3rem;color:#fff;font-weight:400;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif">Scan your website for free</h1><div id="' + containerId + '-widget" style="width:100%;min-height:600px;position:relative;z-index:50"></div></div></div>';

    var target = document.querySelector('main') || document.querySelector('body > div') || document.body;
    if (target) target.appendChild(container);
  }

  // Add styles
  function addStyles() {
    if (document.getElementById('wix-onboarding-styles')) return;

    var style = document.createElement('style');
    style.id = 'wix-onboarding-styles';
    style.textContent = '#{0}{position:relative!important;width:100%!important;min-height:100vh!important;background:transparent!important}#{0} [data-id="{1}"],#{0} [data-id="{1}"] > *,.easydmarc-widget,.easydmarc-widget-container,div[data-easydmarc-widget],#easydmarc-widget-container,#{0}-widget > *{background:transparent!important;max-width:100%!important;visibility:visible!important;opacity:1!important;display:block!important;position:relative!important;z-index:100!important}#{0} [data-id="{1}"] h1,#{0} [data-id="{1}"] h2,#{0} [data-id="{1}"] h3,#{0} [data-id="{1}"] p,#{0} [data-id="{1}"] label,#{0} [data-id="{1}"] span,.easydmarc-widget h1,.easydmarc-widget h2,.easydmarc-widget h3,.easydmarc-widget p,.easydmarc-widget label,.easydmarc-widget span{color:#fff!important}#{0} [data-id="{1}"] input,#{0} [data-id="{1}"] textarea,.easydmarc-widget input,.easydmarc-widget textarea{background:rgba(255,255,255,0.1)!important;border:1px solid rgba(255,255,255,0.2)!important;color:#fff!important}#{0} [data-id="{1}"] input::placeholder,.easydmarc-widget input::placeholder{color:rgba(255,255,255,0.5)!important}#{0} [data-id="{1}"] button,.easydmarc-widget button{background:#FFC700!important;color:#000!important;border:none!important}#{0} [data-id="{1}"] button:hover,.easydmarc-widget button:hover{background:#ffd633!important}#{0} [data-id="{1}"] iframe,.easydmarc-widget iframe{width:100%!important;border:none!important;display:block!important}'.replace(/{0}/g, containerId).replace(/{1}/g, widgetId);
    
    document.head.appendChild(style);
  }

  // Setup domain capture
  function setupCapture() {
    if (captureSetup) return false;
    var widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return false;

    function findInput() {
      var selectors = ['[data-id="' + widgetId + '"] input[type="text"]', '[data-id="' + widgetId + '"] input[type="email"]', '.easydmarc-widget input[type="text"]', '.easydmarc-widget input[type="email"]'];
      for (var i = 0; i < selectors.length; i++) {
        var input = widgetContainer.querySelector(selectors[i]);
        if (input) return input;
      }
      return null;
    }

    function findButton() {
      var selectors = ['[data-id="' + widgetId + '"] button', '.easydmarc-widget button'];
      for (var i = 0; i < selectors.length; i++) {
        var buttons = widgetContainer.querySelectorAll(selectors[i]);
        for (var j = 0; j < buttons.length; j++) {
          if (buttons[j].textContent && buttons[j].textContent.toLowerCase().indexOf('scan') !== -1) {
            return buttons[j];
          }
        }
      }
      return null;
    }

    var input = findInput();
    if (input && !input.__captureSetup) {
      input.addEventListener('blur', function() {
        var domain = input.value ? input.value.trim() : '';
        if (domain) captureDomainData(domain);
      });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          var domain = input.value ? input.value.trim() : '';
          if (domain) captureDomainData(domain);
        }
      });
      input.__captureSetup = true;
    }

    var button = findButton();
    if (button && !button.__captureSetup) {
      button.addEventListener('click', function() {
        var input = findInput();
        if (input) {
          var domain = input.value ? input.value.trim() : '';
          if (domain) captureDomainData(domain);
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

  // Find and move widget
  function findWidget() {
    if (widgetFound) return true;
    var widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return false;

    var selectors = ['[data-id="' + widgetId + '"]', '.easydmarc-widget', '.easydmarc-widget-container'];
    for (var i = 0; i < selectors.length; i++) {
      var widget = document.querySelector(selectors[i]);
      if (widget && widget !== widgetContainer && widget.tagName !== 'SCRIPT') {
        if (widget.contains(widgetContainer)) {
          widgetFound = true;
          setupCapture();
          return true;
        }
        if (!widgetContainer.contains(widget)) {
          widgetContainer.appendChild(widget);
          widgetFound = true;
          setupCapture();
          return true;
        }
      }
    }

    if (widgetContainer.querySelector('[data-id="' + widgetId + '"], .easydmarc-widget')) {
      widgetFound = true;
      setupCapture();
      return true;
    }
    return false;
  }

  // Observer
  function setupObserver() {
    var widgetContainer = document.getElementById(containerId + '-widget');
    if (!widgetContainer) return;

    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        for (var j = 0; j < mutations[i].addedNodes.length; j++) {
          var node = mutations[i].addedNodes[j];
          if (node.nodeType === 1) {
            var isWidget = node.getAttribute('data-id') === widgetId || 
                          node.classList.contains('easydmarc-widget') ||
                          node.querySelector('[data-id="' + widgetId + '"], .easydmarc-widget');
            
            if (isWidget && widgetContainer && !widgetContainer.contains(node)) {
              if (!node.contains(widgetContainer)) {
                widgetContainer.appendChild(node);
                widgetFound = true;
                setupCapture();
              }
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function() { observer.disconnect(); }, 10000);
  }

  // Load EasyDMARC script
  function loadWidget() {
    if (document.querySelector('script[data-id="' + widgetId + '"]')) return;

    var script = document.createElement('script');
    script.setAttribute('data-id', widgetId);
    script.setAttribute('data-token', widgetToken);
    script.src = 'https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0';
    script.async = true;

    script.onload = function() {
      findWidget();
      setTimeout(findWidget, 100);
      var attempts = 0;
      var interval = setInterval(function() {
        attempts++;
        findWidget();
        if (widgetFound || attempts >= 15) clearInterval(interval);
      }, 200);
    };

    document.body.appendChild(script);
  }

  // Initialize
  function init() {
    addStyles();
    createPage();
    setupObserver();
    findWidget();
    loadWidget();
    
    var attempts = 0;
    var interval = setInterval(function() {
      attempts++;
      findWidget();
      if (widgetFound || attempts >= 15) clearInterval(interval);
    }, 200);

    var captureInterval = setInterval(function() {
      if (!captureSetup) {
        setupCapture();
        if (captureSetup) clearInterval(captureInterval);
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

