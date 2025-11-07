/**
 * API Route: Capture Domain Data
 * Purpose: Endpoint to capture and store domain data from Domain Scanner widget
 * Last Updated: 2025-01-28
 * Author: System
 */

import { NextRequest, NextResponse } from 'next/server'

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

    // Log the captured data (you can replace this with database storage)
    const capturedData = {
      domain: domain.trim().toLowerCase(),
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || request.headers.get('user-agent'),
      referrer: referrer || request.headers.get('referer'),
      pageUrl: pageUrl || request.headers.get('origin'),
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    }

    // TODO: Save to database (e.g., MongoDB, PostgreSQL, etc.)
    // Example:
    // await db.domains.create(capturedData)

    // For now, we'll log it (in production, use a proper logging service)
    console.log('Captured domain data:', capturedData)

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

export async function GET(request: NextRequest) {
  // Optional: Return captured domains (for admin/dashboard)
  // In production, fetch from database
  return NextResponse.json(
    { 
      message: 'Domain capture API',
      usage: 'POST to /api/capture-domain with { domain, timestamp, userAgent, referrer, pageUrl }'
    },
    { status: 200 }
  )
}

