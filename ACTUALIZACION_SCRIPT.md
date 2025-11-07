# Actualización del Script de EasyDMARC

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Documentar la actualización al nuevo script de EasyDMARC

## 🔄 Cambios Realizados

### Nuevo Script
- **data-id:** `pzbec9` (anterior: `tp_aWPt5A`)
- **Token:** Nuevo token JWT con configuración actualizada
- **Tema:** Configurado para tema oscuro (`theme_mode: "dark"`)

### Configuración del Nuevo Token

```json
{
  "id": "pzbec9",
  "type": "domain-scanner",
  "autoinit": true,
  "options": {
    "styles": {
      "theme": {
        "backgroundColor": "#081436",
        "titleColor": "#FFFFFF",
        "paragraphColor": "#FFFFFF",
        "buttonsColor": "#ADC2FF",
        "theme_mode": "dark"
      }
    },
    "organization": {
      "domain": "scan.onboardigital.com",
      "objectId": "org_6802d7a9455601c91c062659"
    }
  }
}
```

## 📝 Archivos Actualizados

1. **app/page.tsx**
   - Actualizado `data-id` a `pzbec9`
   - Actualizado `data-token` con el nuevo token
   - Actualizados todos los selectores CSS de `tp_aWPt5A` a `pzbec9`

2. **app/domain-scanner/page.tsx**
   - Actualizado `data-id` a `pzbec9`
   - Actualizado `data-token` con el nuevo token
   - Actualizados todos los selectores y referencias

3. **public/domain-scanner-embed.js**
   - Actualizado `widgetId` por defecto a `pzbec9`
   - Actualizado `widgetToken` por defecto con el nuevo token

4. **public/embed-example.html**
   - Actualizado `data-widget-id` a `pzbec9`
   - Actualizado `data-token` con el nuevo token

## ✅ Ventajas del Nuevo Script

- ✅ **Tema oscuro:** Configurado para tema oscuro, perfecto para la página
- ✅ **Dominio personalizado:** Configurado para `scan.onboardigital.com`
- ✅ **Colores optimizados:** Colores que combinan bien con fondo oscuro
- ✅ **Sin párrafo:** El párrafo está vacío, más limpio
- ✅ **Sin link del widget:** `deactive_widget_link: false` para una experiencia más limpia

## 🎨 Colores del Widget

- **Fondo:** `#081436` (azul oscuro)
- **Título:** `#FFFFFF` (blanco)
- **Párrafo:** `#FFFFFF` (blanco)
- **Botones:** `#ADC2FF` (azul claro)
- **Sombra:** `#3366FF20` (azul con transparencia)

## 📋 Próximos Pasos

1. ✅ Script actualizado en todos los archivos
2. ⏳ Probar en el navegador
3. ⏳ Verificar que el widget carga correctamente
4. ⏳ Verificar que los estilos se aplican bien

## 🔍 Notas

- El nuevo token está configurado para tema oscuro, lo cual es perfecto ya que la página tiene fondo oscuro
- El widget debería verse mejor integrado ahora
- Los colores están optimizados para contraste y legibilidad

