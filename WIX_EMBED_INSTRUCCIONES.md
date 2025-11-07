# Script para Wix - OnBoarding Digital

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Script compatible con Wix que copia la página completa del Domain Scanner

## 🎯 Formato del Script (Igual al Original)

El script usa el mismo formato que el script original de EasyDMARC:

```html
<script 
  data-id="641b98" 
  data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWI5OCIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJ0cnVlIn0sImVkaXRpb24iOiJtc3AiLCJiaW1pX2FjdGl2YXRpb24iOiJ0cnVlIiwib3JnYW5pemF0aW9uIjp7Im9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSIsImRvbWFpbiI6InNjYW4ub25ib2FyZGlnaXRhbC5jb20ifX0sImVtYmVkX3ZlcnNpb24iOiIxLjAuMCIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiaWF0IjoxNzYyNTUzMzYyfQ.wZfNt3v8ttrSayOKoODKxkbBAH_maWkwQv_0etm7swA" 
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
  data-id="641b98" 
  data-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWI5OCIsImhlaWdodCI6ImF1dG8iLCJ0eXBlIjoiZG9tYWluLXNjYW5uZXIiLCJ3aWR0aCI6IjEwMCUiLCJib3hfc2hhZG93IjoiMCAwIDEwcHggIzAwMDAwMDI2IiwiYm9yZGVyX3JhZGl1cyI6IjhweCIsImF1dG9pbml0IjoidHJ1ZSIsIm9wdGlvbnMiOnsic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiMwODE0MzYiLCJ0aXRsZUNvbG9yIjoiI0ZGRkZGRiIsInBhcmFncmFwaENvbG9yIjoiI0ZGRkZGRiIsImJ1dHRvbnNDb2xvciI6IiNBREMyRkYiLCJzaGFkb3dDb2xvciI6IiMzMzY2RkYyMCIsInNoYWRvd0NoZWNrIjoidHJ1ZSIsInRoZW1lX21vZGUiOiJkYXJrIn19LCJjb250ZW50Ijp7InRpdGxlIjoiRG9tYWluIFNjYW5uZXIiLCJwYXJhZ3JhcGgiOiIiLCJidXR0b25fMSI6IlNjYW4gTm93IiwiYnV0dG9uXzIiOiJJbmNyZWFzZSBTY29yZSIsInJlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOiJ0cnVlIn0sImVkaXRpb24iOiJtc3AiLCJiaW1pX2FjdGl2YXRpb24iOiJ0cnVlIiwib3JnYW5pemF0aW9uIjp7Im9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSIsImRvbWFpbiI6InNjYW4ub25ib2FyZGlnaXRhbC5jb20ifX0sImVtYmVkX3ZlcnNpb24iOiIxLjAuMCIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2FwcG9pbnRtZW50IiwiaWF0IjoxNzYyNTUzMzYyfQ.wZfNt3v8ttrSayOKoODKxkbBAH_maWkwQv_0etm7swA" 
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

- `data-id`: ID del widget (641b98)
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

