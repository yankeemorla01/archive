# Domain Scanner Widget - Vercel Deployment

Este proyecto contiene un widget de Domain Scanner (EasyDMARC) que puede ser incrustado como iframe en cualquier página web.

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Sube el proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Domain Scanner Widget"
   git branch -M main
   git remote add origin <tu-repositorio-github>
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión o crea una cuenta
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js
   - Click en "Deploy"

### Opción 2: Desde CLI de Vercel

```bash
npm i -g vercel
vercel
```

Sigue las instrucciones en la terminal.

## 📦 Uso del Iframe

Una vez desplegado en Vercel, obtendrás una URL como: `https://tu-proyecto.vercel.app`

### Incrustar en cualquier página HTML:

```html
<iframe 
  src="https://tu-proyecto.vercel.app/domain-scanner"
  width="100%"
  height="800"
  frameborder="0"
  style="border-radius: 8px; border: 1px solid #e5e7eb;"
  title="Domain Scanner"
  allow="clipboard-read; clipboard-write"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
></iframe>
```

### Usar el componente React en otro proyecto Next.js:

```tsx
import { DomainScannerIframe } from '@/components/domain-scanner-iframe'

<DomainScannerIframe 
  height={800}
  showBorder={true}
  borderRadius={8}
/>
```

## 📁 Estructura del Proyecto

- `/app/domain-scanner/page.tsx` - Página que carga el script de EasyDMARC
- `/app/domain-scanner/layout.tsx` - Layout sin header para iframe
- `/components/domain-scanner-iframe.tsx` - Componente React para incrustar el iframe

## 🔧 Configuración

El proyecto está configurado para:
- ✅ Next.js 15
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Compatible con Vercel Serverless Functions

## 📝 Notas

- La página `/domain-scanner` está optimizada para ser embebida como iframe
- El script de EasyDMARC se carga automáticamente
- El componente iframe detecta automáticamente la URL de producción
