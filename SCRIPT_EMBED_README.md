# Script Embebible - Domain Scanner Widget

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Script embebible para incluir el Domain Scanner widget en cualquier página web

## 📦 Uso Básico

### Opción 1: Uso Simple (Recomendado)

Simplemente incluye el script en tu página HTML. El script creará automáticamente el contenedor necesario:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
</head>
<body>
    <!-- El script creará automáticamente el contenedor -->
    <script src="https://scan.onboardigital.com/domain-scanner-embed.js"></script>
</body>
</html>
```

### Opción 2: Con Contenedor Personalizado

Si quieres especificar dónde debe aparecer el widget:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
</head>
<body>
    <div id="mi-widget-container"></div>
    
    <script src="https://scan.onboardigital.com/domain-scanner-embed.js"
            data-container-id="mi-widget-container"></script>
</body>
</html>
```

### Opción 3: Con Configuración Personalizada

```html
<script src="https://scan.onboardigital.com/domain-scanner-embed.js"
        data-container-id="domain-scanner-container"
        data-widget-id="tp_aWPt5A"
        data-token="tu-token-aqui"></script>
```

## 🔧 Parámetros del Script

| Parámetro | Descripción | Valor por Defecto |
|-----------|-------------|-------------------|
| `data-container-id` | ID del contenedor donde se mostrará el widget | `domain-scanner-container` |
| `data-widget-id` | ID del widget de EasyDMARC | `tp_aWPt5A` |
| `data-token` | Token JWT de configuración del widget | Token por defecto |

## 📋 Características

- ✅ **Carga automática**: El script carga automáticamente el widget de EasyDMARC
- ✅ **Detección inteligente**: Usa MutationObserver para detectar cuando el widget se crea
- ✅ **Posicionamiento automático**: Mueve el widget al contenedor correcto automáticamente
- ✅ **Estilos adaptativos**: Aplica estilos para que el widget se vea bien en fondos oscuros
- ✅ **Sin dependencias**: No requiere React, Next.js u otras librerías
- ✅ **Compatible**: Funciona en cualquier página HTML

## 🎨 Estilos Aplicados

El script aplica automáticamente estilos para:
- Hacer el widget visible en fondos oscuros
- Ajustar colores de texto, inputs y botones
- Asegurar que el widget sea responsive
- Manejar z-index correctamente

## 📝 Ejemplo Completo

Ver el archivo `public/embed-example.html` para un ejemplo completo de uso.

## 🚀 Despliegue

1. ✅ **Proyecto desplegado en Vercel con dominio personalizado**
2. El archivo `domain-scanner-embed.js` está disponible en:
   ```
   https://scan.onboardigital.com/domain-scanner-embed.js
   ```
3. Comparte esta URL con tus usuarios para que puedan incluir el widget

## 🔍 Cómo Funciona

1. El script se ejecuta cuando se carga la página
2. Crea o encuentra el contenedor especificado
3. Aplica los estilos necesarios
4. Carga el script de EasyDMARC
5. Detecta cuando el widget se crea usando MutationObserver
6. Mueve el widget al contenedor correcto
7. Aplica estilos adicionales para que se vea bien

## ⚠️ Notas Importantes

- El script debe cargarse después de que el DOM esté listo (o se maneja automáticamente)
- El contenedor se crea automáticamente si no existe
- El script es idempotente: puedes incluirlo múltiples veces sin problemas
- Los estilos se aplican con `!important` para sobrescribir estilos existentes

## 🐛 Troubleshooting

Si el widget no aparece:

1. **Verifica la consola del navegador** para errores
2. **Verifica que el script se carga** correctamente
3. **Verifica que el token es válido** y no ha expirado
4. **Espera unos segundos** - el widget puede tardar en cargar
5. **Verifica que no hay conflictos** de z-index con otros elementos

## 📞 Soporte

Para más información, consulta la documentación del proyecto o contacta al equipo de desarrollo.

