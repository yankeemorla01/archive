/**
 * EasyDMARC Proxy Route
 * Purpose: Proxy the EasyDMARC widget script
 * Last Updated: 2025-01-28
 * Author: System
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    // Fetch the original script from EasyDMARC
    const response = await fetch('https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0', {
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': request.headers.get('referer') || 'https://onboardigital.com',
        'Accept': 'application/javascript, text/javascript, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error('EasyDMARC proxy: Failed to fetch script', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch script', status: response.status },
        { status: response.status }
      )
    }

    const scriptContent = await response.text()
    
    if (!scriptContent || scriptContent.length === 0) {
      console.error('EasyDMARC proxy: Empty script content')
      return NextResponse.json(
        { error: 'Empty script content' },
        { status: 500 }
      )
    }

    return new NextResponse(scriptContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error: any) {
    console.error('Error proxying EasyDMARC script:', error)
    
    // Handle timeout
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: 'Request timeout' },
        { status: 504 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

