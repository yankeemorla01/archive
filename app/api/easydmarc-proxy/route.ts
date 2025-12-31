/**
 * EasyDMARC Proxy Route
 * Purpose: Proxy the EasyDMARC widget script
 * Last Updated: 2025-01-28
 * Author: System
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Fetch the original script from EasyDMARC
    const response = await fetch('https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0', {
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0',
        'Referer': request.headers.get('referer') || 'https://onboardigital.com',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch script' },
        { status: response.status }
      )
    }

    const scriptContent = await response.text()

    return new NextResponse(scriptContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error proxying EasyDMARC script:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

