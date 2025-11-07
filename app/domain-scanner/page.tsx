'use client'

import { useEffect } from 'react'

/**
 * Domain Scanner Page
 * Purpose: Host the EasyDMARC domain scanner widget script
 * Last Updated: 2025-01-28
 * Author: System
 */

export default function DomainScannerPage() {
  useEffect(() => {
    // Load the EasyDMARC domain scanner script
    const script = document.createElement('script')
    script.setAttribute('data-id', 'tp_aWPt5A')
    script.setAttribute(
      'data-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRwX2FXUHQ1QSIsInR5cGUiOiJkb21haW4tc2Nhbm5lciIsImJvcmRlcl9yYWRpdXMiOiI4cHgiLCJhdXRvaW5pdCI6dHJ1ZSwiYm94X3NoYWRvdyI6IjAgMCAxMHB4ICMwMDAwMDAyNiIsImVtYmVkX3JlZGlyZWN0X3VybCI6Imh0dHBzOi8vd3d3Lm9uYm9hcmRpZ2l0YWwuY29tL2NvbnRhY3QiLCJlbWJlZF92ZXJzaW9uIjoiMS4wLjAiLCJoZWlnaHQiOiJhdXRvIiwid2lkdGgiOiIxMDAlIiwib3B0aW9ucyI6eyJiaW1pX2FjdGl2YXRpb24iOnRydWUsIm9yZ2FuaXphdGlvbiI6eyJkb21haW4iOiJvbmJvYXJkaWdpdGFsLmNvbSIsIm9iamVjdElkIjoib3JnXzY4MDJkN2E5NDU1NjAxYzkxYzA2MjY1OSJ9LCJlZGl0aW9uIjoibXNwIiwic3R5bGVzIjp7InRoZW1lIjp7ImJhY2tncm91bmRDb2xvciI6IiNGRkZGRkYiLCJ0aXRsZUNvbG9yIjoiIzFBMzM4MCIsInBhcmFncmFwaENvbG9yIjoiIzVBNUU3MiIsImJ1dHRvbnNDb2xvciI6IiMzMzY2RkYiLCJzaGFkb3dDaGVjayI6dHJ1ZSwic2hhZG93Q29sb3IiOiIjMzM2NkZGMjAiLCJ0aGVtZV9tb2RlIjoibGlnaHQifX0sImNvbnRlbnQiOnsidGl0bGUiOiJEb21haW4gU2Nhbm5lciIsInBhcmFncmFwaCI6IlNjYW4gYSBkb21haW4gdG8gZ2V0IGl0IGFuYWx5emVkIGZvciBwb3NzaWJsZSBpc3N1ZXMgd2l0aCBETUFSQywgU1BGLCBES0lNIGFuZCBCSU1JIHJlY29yZHMuIiwiYnV0dG9uXzEiOiJTY2FuIE5vdyIsImJ1dHRvbl8yIjoiSW5jcmVhc2UgU2NvcmUiLCJyZWRpcmVjdF91cmwiOiJodHRwczovL3d3dy5vbmJvYXJkaWdpdGFsLmNvbS9jb250YWN0IiwiZGVhY3RpdmVfd2lkZ2V0X2xpbmsiOnRydWV9fSwiaWF0IjoxNzYxNzg5ODczfQ.hQiVVhwpQ4rh7iUoqmJSbiIlDS3Z5n1zc7N5vMtGXW0'
    )
    script.src = 'https://easydmarc.com/tools/domain-scanner/embedjs/1.0.0'
    script.async = true

    document.body.appendChild(script)

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-white" style={{ padding: '1rem' }}>
      <div className="w-full" />
    </div>
  )
}

