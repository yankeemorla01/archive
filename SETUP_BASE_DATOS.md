# Setup Rápido: Base de Datos Gratuita

**Fecha:** 2025-01-28  
**Autor:** Sistema

## 🚀 Setup con Supabase (5 minutos)

### Paso 1: Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea cuenta
2. Crea un nuevo proyecto (elige región cercana)
3. Espera a que se cree el proyecto (2-3 minutos)

### Paso 2: Crear la tabla

En Supabase, ve a **SQL Editor** y ejecuta:

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

CREATE INDEX idx_domain ON captured_domains(domain);
CREATE INDEX idx_created_at ON captured_domains(created_at);
```

### Paso 3: Obtener credenciales

1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 4: Instalar dependencia

```bash
npm install @supabase/supabase-js
```

### Paso 5: Configurar variables de entorno

**En Vercel:**
1. Ve a tu proyecto en Vercel
2. **Settings** > **Environment Variables**
3. Agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key

**Localmente (`.env.local`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Paso 6: Activar la implementación

1. Renombra `app/api/capture-domain/route.supabase.example.ts` a `route.ts`
2. O copia el contenido del ejemplo al archivo actual

### Paso 7: Probar

1. Despliega en Vercel
2. Ingresa un dominio en el widget
3. Ve a Supabase > **Table Editor** > `captured_domains`
4. Deberías ver el dominio guardado

---

## ✅ Verificar que funciona

1. Abre la consola del navegador (F12)
2. Ingresa un dominio en el widget
3. Deberías ver: `Domain captured successfully`
4. En Supabase, verifica que el registro apareció

---

## 📊 Ver los datos capturados

### Opción 1: Dashboard de Supabase
- Ve a **Table Editor** > `captured_domains`
- Verás todos los dominios en tiempo real

### Opción 2: API GET
```bash
curl https://tu-dominio.vercel.app/api/capture-domain
```

---

## 🔧 Troubleshooting

**Error: "Missing Supabase environment variables"**
- Verifica que las variables estén en Vercel
- Reinicia el deployment después de agregar variables

**Error: "relation 'captured_domains' does not exist"**
- Ejecuta el SQL de creación de tabla en Supabase

**Error: "new row violates row-level security policy"**
- En Supabase, ve a **Authentication** > **Policies**
- Crea una política que permita INSERT para todos (o configura RLS según necesites)

---

## 🎉 ¡Listo!

Tu sistema ahora guarda automáticamente todos los dominios que los usuarios ingresen.

