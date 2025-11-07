# Guía de Bases de Datos Gratuitas para Vercel

**Fecha:** 2025-01-28  
**Autor:** Sistema  
**Propósito:** Guía de bases de datos gratuitas compatibles con Vercel para almacenar datos capturados

## 🎯 Mejores Opciones Gratuitas

### 1. **Vercel Postgres** ⭐ (Recomendado)
- **Plan Gratuito:** 256 MB de almacenamiento, 60 horas de cómputo/mes
- **Tipo:** PostgreSQL
- **Ventajas:** Integración nativa con Vercel, muy fácil de configurar
- **Ideal para:** Proyectos que ya están en Vercel

### 2. **Supabase** ⭐ (Muy Recomendado)
- **Plan Gratuito:** 500 MB de almacenamiento, 50,000 solicitudes/mes
- **Tipo:** PostgreSQL
- **Ventajas:** API REST automática, autenticación incluida, dashboard completo
- **Ideal para:** Proyectos que necesitan autenticación y API automática

### 3. **MongoDB Atlas**
- **Plan Gratuito:** 512 MB de almacenamiento
- **Tipo:** NoSQL (MongoDB)
- **Ventajas:** Muy flexible, fácil de usar
- **Ideal para:** Datos no estructurados o flexibles

### 4. **Neon**
- **Plan Gratuito:** 0.5 GB de almacenamiento
- **Tipo:** PostgreSQL Serverless
- **Ventajas:** PostgreSQL moderno, branching de bases de datos
- **Ideal para:** Desarrollo con PostgreSQL

### 5. **PlanetScale**
- **Plan Gratuito:** 5 GB de almacenamiento, 1 billón de filas leídas/mes
- **Tipo:** MySQL Serverless
- **Ventajas:** Escalable, branching de bases de datos
- **Ideal para:** Proyectos que necesitan MySQL

---

## 🚀 Implementación: Supabase (Recomendado)

### Paso 1: Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Anota tu **URL del proyecto** y **API Key** (Settings > API)

### Paso 2: Crear tabla en Supabase

En el SQL Editor de Supabase, ejecuta:

```sql
CREATE TABLE captured_domains (
  id BIGSERIAL PRIMARY KEY,
  domain TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas rápidas por dominio
CREATE INDEX idx_domain ON captured_domains(domain);
CREATE INDEX idx_created_at ON captured_domains(created_at);
```

### Paso 3: Instalar dependencias

```bash
npm install @supabase/supabase-js
```

### Paso 4: Configurar variables de entorno

Crea/edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_api_key_anon
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Paso 5: Crear cliente Supabase

Crea `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Paso 6: Actualizar API Route

Actualiza `app/api/capture-domain/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    const capturedData = {
      domain: domain.trim().toLowerCase(),
      timestamp: timestamp || new Date().toISOString(),
      user_agent: userAgent || request.headers.get('user-agent'),
      referrer: referrer || request.headers.get('referer'),
      page_url: pageUrl || request.headers.get('origin'),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    }

    // Guardar en Supabase
    const { data, error } = await supabase
      .from('captured_domains')
      .insert([capturedData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save domain' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Domain captured successfully',
        data: data[0]
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

export async function GET(request: NextRequest) {
  try {
    // Obtener todos los dominios capturados (opcional: agregar paginación)
    const { data, error } = await supabase
      .from('captured_domains')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch domains' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Captured domains',
        count: data?.length || 0,
        data: data
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 🚀 Implementación: Vercel Postgres

### Paso 1: Conectar Vercel Postgres

1. En tu proyecto de Vercel, ve a **Storage**
2. Haz clic en **Create Database** > **Postgres**
3. Selecciona el plan **Hobby** (gratuito)
4. Anota las variables de entorno que se generan

### Paso 2: Instalar dependencias

```bash
npm install @vercel/postgres
```

### Paso 3: Crear tabla

Crea `lib/init-db.ts` (ejecutar una vez):

```typescript
import { sql } from '@vercel/postgres'

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS captured_domains (
        id SERIAL PRIMARY KEY,
        domain VARCHAR(255) NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        user_agent TEXT,
        referrer TEXT,
        page_url TEXT,
        ip VARCHAR(45),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_domain ON captured_domains(domain);
    `
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}
```

### Paso 4: Actualizar API Route

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

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

    const capturedData = {
      domain: domain.trim().toLowerCase(),
      timestamp: timestamp || new Date().toISOString(),
      user_agent: userAgent || request.headers.get('user-agent'),
      referrer: referrer || request.headers.get('referer'),
      page_url: pageUrl || request.headers.get('origin'),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    }

    // Guardar en Vercel Postgres
    const result = await sql`
      INSERT INTO captured_domains (domain, timestamp, user_agent, referrer, page_url, ip)
      VALUES (${capturedData.domain}, ${capturedData.timestamp}, ${capturedData.user_agent}, ${capturedData.referrer}, ${capturedData.page_url}, ${capturedData.ip})
      RETURNING *
    `

    return NextResponse.json(
      { 
        success: true, 
        message: 'Domain captured successfully',
        data: result.rows[0]
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

---

## 🚀 Implementación: MongoDB Atlas

### Paso 1: Crear cuenta en MongoDB Atlas

1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster gratuito (M0)
4. Crea un usuario de base de datos
5. Obtén la connection string

### Paso 2: Instalar dependencias

```bash
npm install mongodb
```

### Paso 3: Configurar variables de entorno

```env
MONGODB_URI=tu_connection_string_de_mongodb
```

### Paso 4: Crear cliente MongoDB

Crea `lib/mongodb.ts`:

```typescript
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
```

### Paso 5: Actualizar API Route

```typescript
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

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

    const client = await clientPromise
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

    const result = await collection.insertOne(capturedData)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Domain captured successfully',
        data: { ...capturedData, _id: result.insertedId }
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

---

## 📊 Comparación Rápida

| Base de Datos | Almacenamiento Gratis | Facilidad | Mejor Para |
|--------------|----------------------|-----------|------------|
| **Supabase** | 500 MB | ⭐⭐⭐⭐⭐ | Proyectos completos con auth |
| **Vercel Postgres** | 256 MB | ⭐⭐⭐⭐⭐ | Proyectos en Vercel |
| **MongoDB Atlas** | 512 MB | ⭐⭐⭐⭐ | Datos flexibles |
| **Neon** | 500 MB | ⭐⭐⭐⭐ | PostgreSQL moderno |
| **PlanetScale** | 5 GB | ⭐⭐⭐⭐ | MySQL serverless |

---

## 🎯 Recomendación Final

**Para tu proyecto, recomiendo Supabase** porque:
- ✅ 500 MB gratis (suficiente para empezar)
- ✅ Dashboard completo para ver los datos
- ✅ API REST automática
- ✅ Muy fácil de integrar
- ✅ Excelente documentación

---

## 📝 Próximos Pasos

1. Elige una base de datos
2. Sigue los pasos de implementación
3. Actualiza `app/api/capture-domain/route.ts` con el código correspondiente
4. Agrega las variables de entorno en Vercel (Settings > Environment Variables)
5. Prueba el sistema

¡Listo! Tus datos se guardarán automáticamente en la base de datos.

