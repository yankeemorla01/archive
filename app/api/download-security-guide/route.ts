/**
 * Security Guide PDF Download Route
 * Purpose: Serve the Security Awareness Training PDF with proper download headers
 * Last Updated: 2025-01-28
 * Author: System
 */

import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    // Path to the PDF file in the public directory
    const filePath = join(process.cwd(), 'public', 'Guide to Security Awareness Training [EN] [WL] [Shared].pdf')
    
    // Read the file
    const fileBuffer = await readFile(filePath)
    
    // Return the file with proper headers to force download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Guide to Security Awareness Training [EN] [WL] [Shared].pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Error serving PDF file:', error)
    return NextResponse.json(
      { error: 'Failed to serve PDF file' },
      { status: 500 }
    )
  }
}

