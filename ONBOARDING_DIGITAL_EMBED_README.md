# Script Embebible - OnBoarding Digital

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Script embebible que copia la página completa del Domain Scanner para usar en OnBoarding Digital

## 📦 Uso

### Opción 1: Uso Simple (Recomendado)

Simplemente incluye el script en tu página HTML. El script creará automáticamente toda la página completa:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
</head>
<body>
    <!-- El script creará automáticamente la página completa -->
    <script src="https://scan.onboardigital.com/onboarding-digital-embed.js"></script>
</body>
</html>
```

### Opción 2: Con Contenedor Personalizado

Si quieres especificar dónde debe aparecer la página:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
</head>
<body>
    <div id="mi-contenedor-personalizado"></div>
    
    <script src="https://scan.onboardigital.com/onboarding-digital-embed.js"
            data-container-id="mi-contenedor-personalizado"></script>
</body>
</html>
```

### Opción 3: Con Configuración Personalizada

```html
<script src="https://scan.onboardigital.com/onboarding-digital-embed.js"
        data-container-id="onboarding-digital-scanner"
        data-widget-id="641b98"
        data-token="tu-token-aqui"></script>
```

## 🔧 Parámetros del Script

| Parámetro | Descripción | Valor por Defecto |
|-----------|-------------|-------------------|
| `data-container-id` | ID del contenedor donde se mostrará la página completa | `onboarding-digital-scanner` |
| `data-widget-id` | ID del widget de EasyDMARC | `641b98` |
| `data-token` | Token JWT de configuración del widget | Token por defecto |

## 📋 Características

- ✅ **Página completa**: Crea toda la página con título, diseño y widget
- ✅ **Carga automática**: El script carga automáticamente el widget de EasyDMARC
- ✅ **Detección inteligente**: Usa MutationObserver para detectar cuando el widget se crea
- ✅ **Posicionamiento automático**: Mueve el widget al contenedor correcto automáticamente
- ✅ **Estilos adaptativos**: Aplica estilos para que la página se vea bien en cualquier fondo
- ✅ **Captura de datos**: Captura automáticamente los dominios ingresados
- ✅ **Responsive**: Se adapta a diferentes tamaños de pantalla

## 🎨 Lo que incluye

El script crea automáticamente:

1. **Contenedor principal** con diseño completo
2. **Título**: "Scan your website for free"
3. **Widget de Domain Scanner** completamente funcional
4. **Estilos CSS** para tema oscuro
5. **Sistema de captura** de datos de dominios

## 📊 Captura de Datos

El script captura automáticamente:
- Dominio ingresado
- Timestamp
- User Agent
- Referrer
- URL de la página
- IP (si está disponible)

Los datos se envían a: `https://scan.onboardigital.com/api/capture-domain`

## 🚀 Ejemplo Completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OnBoarding Digital - Domain Scanner</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
    </style>
</head>
<body>
    <!-- El script creará toda la página aquí -->
    <script src="https://scan.onboardigital.com/onboarding-digital-embed.js"></script>
</body>
</html>
```

## 📝 Notas

- El script es completamente autónomo y no requiere dependencias externas
- Funciona en cualquier página HTML
- No interfiere con el contenido existente de la página
- Los estilos están encapsulados y no afectan otros elementos

## 🔗 URL del Script

El script está disponible en:
- **Producción**: `https://scan.onboardigital.com/onboarding-digital-embed.js`
- **Desarrollo**: `http://localhost:3000/onboarding-digital-embed.js`

## ✅ Ventajas

- **Fácil de usar**: Solo una línea de código
- **Completo**: Incluye toda la página, no solo el widget
- **Profesional**: Diseño limpio y moderno
- **Funcional**: Captura de datos automática
- **Responsive**: Se adapta a móviles y desktop

