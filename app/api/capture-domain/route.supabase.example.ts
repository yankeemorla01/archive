/**
 * API Route: Capture Domain Data (Supabase Implementation)
 * Purpose: Endpoint to capture and store domain data using Supabase
 * Last Updated: 2025-01-28
 * Author: System
 * 
 * INSTRUCCIONES:
 * 1. Renombra este archivo a route.ts (reemplaza el actual)
 * 2. Instala: npm install @supabase/supabase-js
 * 3. Configura las variables de entorno en Vercel
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
        { error: 'Failed to save domain', details: error.message },
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
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Obtener dominios capturados con paginación
    const { data, error, count } = await supabase
      .from('captured_domains')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch domains', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Captured domains',
        count: count || 0,
        limit,
        offset,
        data: data || []
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching domains:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

