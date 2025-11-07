# Análisis del Domain Scanner Widget

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Análisis completo del estado actual y problemas identificados

## 📋 Estado Actual

### 1. Estructura del Proyecto

#### Página Principal (`app/page.tsx`)
- **Función:** Carga el widget de EasyDMARC directamente en la página principal
- **Características:**
  - Fondo WebGL con partículas (z-index: 1, posición fixed)
  - Script de EasyDMARC cargado con `next/script`
  - Contenedor `#domain-scanner-container` con z-index: 50
  - Lógica compleja para buscar y mover el widget después de que se carga
  - Estilos CSS inyectados para hacer el widget visible en fondo oscuro

#### Página Iframe (`app/domain-scanner/page.tsx`)
- **Función:** Página dedicada para ser embebida como iframe
- **Características:**
  - Carga el mismo script de EasyDMARC
  - Fondo transparente
  - Estilos básicos para transparencia

#### Componente Iframe (`components/domain-scanner-iframe.tsx`)
- **Función:** Componente React para embeberse en otras páginas
- **Estado:** Existe pero NO se está usando en la página principal
- **Características:**
  - Crea un iframe que apunta a `/domain-scanner`
  - Configuración de sandbox y permisos

### 2. Configuración del Widget (Token JWT)

```json
{
  "id": "tp_aWPt5A",
  "type": "domain-scanner",
  "autoinit": true,
  "height": "auto",
  "width": "100%",
  "options": {
    "styles": {
      "theme": {
        "backgroundColor": "#FFFFFF",
        "theme_mode": "light"
      }
    }
  }
}
```

**Observaciones:**
- Widget configurado para tema **claro** (fondo blanco)
- Página tiene fondo **oscuro** (#000000)
- `autoinit: true` - debería inicializarse automáticamente

## 🔍 Problemas Identificados

### Problema 1: Visibilidad del Widget
**Síntoma:** El widget no se ve o no es visible

**Causas posibles:**
1. **Conflicto de temas:** Widget configurado para tema claro, página oscura
2. **Z-index:** El fondo WebGL (z-index: 1) puede estar interfiriendo
3. **Posicionamiento:** El widget puede estar renderizándose fuera del viewport
4. **Inicialización:** El widget puede no estar inicializándose correctamente

### Problema 2: Lógica Frágil de Búsqueda
**Síntoma:** Código complejo que busca el widget después de que se carga

**Problemas:**
- Búsqueda por múltiples selectores CSS
- Intervalos de tiempo arbitrarios (2s, 3s, 10s)
- Búsqueda en todo el DOM
- Lógica que puede fallar si el widget se crea de forma diferente

### Problema 3: Dos Enfoques Diferentes
**Síntoma:** Hay dos formas de cargar el widget:
1. Script directo en página principal
2. Iframe embebido (componente no usado)

**Problema:** No está claro cuál es el enfoque correcto

### Problema 4: Estilos CSS Inyectados
**Síntoma:** Muchos estilos `!important` para forzar visibilidad

**Problema:** Indica que hay conflictos de estilos que se están forzando

## ✅ Cómo Debería Funcionar

### Comportamiento Esperado del Widget EasyDMARC

1. **Carga del Script:**
   - El script se carga con `data-id` y `data-token`
   - El script busca un elemento con `data-id="tp_aWPt5A"` o lo crea
   - Si `autoinit: true`, el widget se inicializa automáticamente

2. **Renderizado:**
   - El widget debería renderizarse donde está el script o en un contenedor específico
   - Debería respetar los estilos del token (tema claro)
   - Debería ser visible inmediatamente

3. **Integración:**
   - El widget debería integrarse naturalmente con el diseño de la página
   - Los estilos deberían adaptarse al tema de la página

## 🎯 Soluciones Propuestas

### Opción 1: Usar Iframe (Recomendado)
**Ventajas:**
- Aislamiento completo de estilos
- Widget funciona independientemente del tema de la página
- Más fácil de mantener
- Ya existe el componente y la página

**Implementación:**
- Usar `DomainScannerIframe` en la página principal
- Eliminar la lógica compleja de búsqueda
- Simplificar estilos

### Opción 2: Corregir Integración Directa
**Ventajas:**
- Widget nativo sin iframe
- Mejor rendimiento
- Integración más fluida

**Implementación:**
- Crear contenedor específico antes de cargar el script
- Configurar el widget para que se renderice en el contenedor
- Actualizar token para tema oscuro o adaptar estilos
- Simplificar lógica de búsqueda

### Opción 3: Híbrida
**Ventajas:**
- Flexibilidad para usar ambos enfoques

**Implementación:**
- Mantener ambos enfoques
- Usar iframe en página principal
- Mantener página `/domain-scanner` para embeberse en otros sitios

## 📊 Comparación de Enfoques

| Aspecto | Script Directo | Iframe |
|---------|---------------|--------|
| Rendimiento | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Aislamiento | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mantenimiento | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Integración | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Complejidad | ⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🔧 Próximos Pasos

1. **Verificar en navegador:**
   - Abrir consola del navegador
   - Ver si el script se carga correctamente
   - Verificar si el widget se crea en el DOM
   - Revisar errores de consola

2. **Decidir enfoque:**
   - Evaluar si iframe es aceptable
   - O si se prefiere integración directa

3. **Implementar solución:**
   - Según la opción elegida
   - Simplificar código
   - Probar en diferentes navegadores

## 📝 Notas Adicionales

- El token JWT tiene fecha de emisión: `iat: 1761789873` (timestamp)
- El widget está configurado para la organización: `onboardigital.com`
- La página tiene un fondo WebGL que puede interferir con la visibilidad
- Los estilos CSS están siendo inyectados dinámicamente, lo que puede causar problemas de rendimiento

