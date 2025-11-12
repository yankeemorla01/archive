import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { size, position } = await request.json()

    if (!size || !position) {
      return NextResponse.json(
        { error: 'Size and position are required' },
        { status: 400 }
      )
    }

    // Ruta al archivo del componente
    const filePath = join(process.cwd(), 'components', 'resizable-logo.tsx')
    
    // Leer el archivo
    const fileContent = await readFile(filePath, 'utf-8')
    
    // Actualizar DEFAULT_LOGO_SIZE
    let updatedContent = fileContent.replace(
      /const DEFAULT_LOGO_SIZE = \d+/,
      `const DEFAULT_LOGO_SIZE = ${size}`
    )
    
    // Actualizar DEFAULT_LOGO_POSITION - manejar diferentes formatos
    updatedContent = updatedContent.replace(
      /const DEFAULT_LOGO_POSITION = \{ left: [-\d.]+(?:\.\d+)?, top: [-\d.]+(?:\.\d+)? \}/,
      `const DEFAULT_LOGO_POSITION = { left: ${position.left}, top: ${position.top} }`
    )
    
    // Escribir el archivo actualizado
    await writeFile(filePath, updatedContent, 'utf-8')
    
    return NextResponse.json({ 
      success: true,
      message: 'Logo defaults updated in code',
      size,
      position
    })
  } catch (error) {
    console.error('Error updating logo defaults:', error)
    return NextResponse.json(
      { error: 'Failed to update logo defaults' },
      { status: 500 }
    )
  }
}

