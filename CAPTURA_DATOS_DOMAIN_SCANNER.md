# Sistema de Captura de Datos - Domain Scanner

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Documentar el sistema de captura de datos ingresados por usuarios en el widget Domain Scanner

## 📋 Descripción

El sistema captura automáticamente los dominios que los usuarios ingresan en el widget de Domain Scanner. Los datos se envían a un endpoint API que puede almacenarlos en una base de datos.

## 🔧 Componentes Implementados

### 1. API Endpoint (`app/api/capture-domain/route.ts`)

Endpoint REST que recibe y procesa los datos capturados:

- **POST** `/api/capture-domain` - Recibe y almacena los datos del dominio
- **GET** `/api/capture-domain` - Información sobre el endpoint

#### Datos Capturados

```typescript
{
  domain: string,           // Dominio ingresado por el usuario
  timestamp: string,        // Fecha y hora en ISO format
  userAgent: string,        // Navegador del usuario
  referrer: string,         // Página de origen
  pageUrl: string,         // URL de la página actual
  ip: string              // IP del usuario (si está disponible)
}
```

### 2. Captura en Página Principal (`app/page.tsx`)

Sistema de captura integrado que:
- Detecta el input del widget automáticamente
- Escucha eventos de `blur` (cuando el usuario sale del campo)
- Escucha eventos de `Enter` (cuando el usuario presiona Enter)
- Escucha clics en el botón "Scan"

### 3. Captura en Página Iframe (`app/domain-scanner/page.tsx`)

Mismo sistema de captura adaptado para la página iframe.

## 🎯 Cómo Funciona

1. **Detección del Widget**: El sistema busca el widget usando múltiples selectores CSS
2. **Detección del Input**: Encuentra el campo de entrada del dominio
3. **Event Listeners**: Agrega listeners a:
   - Evento `blur` del input (cuando el usuario sale del campo)
   - Evento `keydown` para detectar Enter
   - Evento `click` del botón "Scan"
4. **Captura de Datos**: Cuando se detecta un dominio válido, se envía a la API
5. **Almacenamiento**: La API procesa y puede almacenar los datos (actualmente solo los registra en consola)

## 📊 Ejemplo de Datos Capturados

```json
{
  "domain": "example.com",
  "timestamp": "2025-01-28T12:34:56.789Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com",
  "pageUrl": "https://scan.onboardigital.com",
  "ip": "192.168.1.1"
}
```

## 🔌 Integración con Base de Datos

Para almacenar los datos en una base de datos, modifica `app/api/capture-domain/route.ts`:

### Ejemplo con MongoDB

```typescript
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { domain, timestamp, userAgent, referrer, pageUrl } = body

    // Validate domain
    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      )
    }

    await client.connect()
    const db = client.db('domain_scanner')
    const collection = db.collection('captured_domains')

    const capturedData = {
      domain: domain.trim().toLowerCase(),
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || request.headers.get('user-agent'),
      referrer: referrer || request.headers.get('referer'),
      pageUrl: pageUrl || request.headers.get('origin'),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown',
      createdAt: new Date()
    }

    await collection.insertOne(capturedData)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Domain captured successfully',
        data: capturedData
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error capturing domain:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Ejemplo con PostgreSQL (usando Prisma)

```typescript
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { domain, timestamp, userAgent, referrer, pageUrl } = body

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      )
    }

    const capturedData = await prisma.capturedDomain.create({
      data: {
        domain: domain.trim().toLowerCase(),
        timestamp: timestamp || new Date().toISOString(),
        userAgent: userAgent || request.headers.get('user-agent'),
        referrer: referrer || request.headers.get('referer'),
        pageUrl: pageUrl || request.headers.get('origin'),
        ip: request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            'unknown'
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Domain captured successfully',
        data: capturedData
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error capturing domain:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## 🔒 Privacidad y Cumplimiento

**IMPORTANTE**: Asegúrate de cumplir con las regulaciones de privacidad (GDPR, CCPA, etc.):

1. **Política de Privacidad**: Informa a los usuarios que se capturan los datos
2. **Consentimiento**: Considera agregar un checkbox de consentimiento
3. **Datos Sensibles**: No captures información personal identificable (PII) sin consentimiento
4. **Retención**: Define políticas de retención de datos
5. **Seguridad**: Encripta los datos almacenados

## 🧪 Pruebas

Para probar el sistema:

1. Abre la consola del navegador (F12)
2. Ingresa un dominio en el widget
3. Presiona Enter o haz clic en "Scan"
4. Verás en la consola: `Domain captured successfully: {...}`

## 📝 Notas

- Los datos se capturan automáticamente sin interrumpir la funcionalidad del widget
- El sistema es resiliente y sigue intentando configurar la captura si el widget se carga después
- Los datos se validan antes de ser enviados a la API
- El sistema evita duplicar listeners usando flags `__captureSetup`

## 🚀 Próximos Pasos

1. Integrar con base de datos (MongoDB, PostgreSQL, etc.)
2. Crear dashboard para ver los dominios capturados
3. Agregar analytics y estadísticas
4. Implementar notificaciones en tiempo real
5. Agregar filtros y búsqueda de dominios capturados

