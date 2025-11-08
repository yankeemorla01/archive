# Script para Wix - OnBoarding Digital

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Script compatible con Wix que copia la página completa del Domain Scanner

## 🎯 Formato del Script (Igual al Original)

El script usa el mismo formato que el script original de EasyDMARC:

```html
<script 
  data-id="tp_oJdup5" 
  data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6dHJ1ZX19LCJpYXQiOjE3NjI1NTM0NDd9.xRru61CTu5bXvfbGfdutYti3m5i_PIvN5IH-evdCIsk" 
  src="https://scan.onboardigital.com/wix-onboarding-digital.js">
</script>
```

## 📋 Cómo Usar en Wix

### Paso 1: Ir a la Configuración de Código Personalizado

1. En el editor de Wix, ve a **Settings** (Configuración)
2. Selecciona **Custom Code** (Código Personalizado)
3. Haz clic en **+ Add Custom Code**

### Paso 2: Agregar el Script

1. **Nombre**: Domain Scanner
2. **Ubicación**: Choose where to add code → **Body - end**
3. **Código**: Pega el script completo:

```html
<script 
  data-id="tp_oJdup5" 
  data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX29KZHVwNSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZW1iZWRfdmVyc2lvbiI6IjEuMC4wIiwiaGVpZ2h0IjoiYXV0byIsIndpZHRoIjoiMTAwJSIsIm9wdGlvbnMiOnsiYmltaV9hY3RpdmF0aW9uIjp0cnVlLCJvcmdhbml6YXRpb24iOnsiZG9tYWluIjoib25ib2FyZGlnaXRhbC5jb20iLCJvYmplY3RJZCI6Im9yZ182ODAyZDdhOTQ1NTYwMWM5MWMwNjI2NTkifSwiZWRpdGlvbiI6Im1zcCIsInN0eWxlcyI6eyJ0aGVtZSI6eyJiYWNrZ3JvdW5kQ29sb3IiOiIjMEExNDMzIiwidGl0bGVDb2xvciI6IiNGRkZGRkYiLCJwYXJhZ3JhcGhDb2xvciI6IiNGRkZGRkYiLCJidXR0b25zQ29sb3IiOiIjQURDMkZGIiwic2hhZG93Q2hlY2siOmZhbHNlLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiJTY2FuIGEgZG9tYWluIHRvIGdldCBpdCBhbmFseXplZCBmb3IgcG9zc2libGUgaXNzdWVzIHdpdGggRE1BUkMsIFNQRiwgREtJTSBhbmQgQklNSSByZWNvcmRzLiIsImJ1dHRvbl8xIjoiU2NhbiBOb3ciLCJidXR0b25fMiI6IkluY3JlYXNlIFNjb3JlIiwicmVkaXJlY3RfdXJsIjoiaHR0cHM6Ly93d3cub25ib2FyZGlnaXRhbC5jb20vYXBwb2ludG1lbnQiLCJkZWFjdGl2ZV93aWRnZXRfbGluayI6dHJ1ZX19LCJpYXQiOjE3NjI1NTM0NDd9.xRru61CTu5bXvfbGfdutYti3m5i_PIvN5IH-evdCIsk" 
  src="https://scan.onboardigital.com/wix-onboarding-digital.js">
</script>
```

4. **Aplicar a**: All pages (Todas las páginas) o selecciona páginas específicas
5. Haz clic en **Apply** (Aplicar)

### Paso 3: Publicar

1. Haz clic en **Publish** (Publicar)
2. El script se cargará automáticamente y creará la página completa

## ✨ Características

- ✅ **Formato idéntico**: Usa el mismo formato que el script original
- ✅ **Página completa**: Crea automáticamente título + widget
- ✅ **Compatible con Wix**: Optimizado para funcionar en Wix
- ✅ **Captura de datos**: Captura automáticamente los dominios
- ✅ **Responsive**: Se adapta a móviles y desktop

## 🎨 Lo que Crea

El script crea automáticamente:

1. **Título**: "Scan your website for free"
2. **Widget de Domain Scanner** completamente funcional
3. **Estilos CSS** para tema oscuro
4. **Sistema de captura** de datos

## 📊 Parámetros

- `data-id`: ID del widget (tp_oJdup5)
- `data-token`: Token JWT de configuración
- `src`: URL del script

## 🔗 URL del Script

Una vez desplegado:
- **Producción**: `https://scan.onboardigital.com/wix-onboarding-digital.js`

## ⚠️ Notas para Wix

- El script debe agregarse en **Body - end** (al final del body)
- Funciona en todas las páginas o páginas específicas
- No interfiere con otros elementos de Wix
- Los estilos están encapsulados

## ✅ Ventajas

- **Simple**: Mismo formato que el script original
- **Completo**: Crea toda la página automáticamente
- **Compatible**: Funciona perfectamente en Wix
- **Profesional**: Diseño limpio y moderno

