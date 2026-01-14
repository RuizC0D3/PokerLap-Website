// src/app/api/tienda/[id]/route.ts
import { NextResponse } from 'next/server'

const UPSTREAM = 'https://api.pkti.me/tienda'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const clubId = params.id

    // Obtener planes desde la BD filtrando por club
    const planesRes = await fetch("https://api.pkti.me/db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: "Plan_Listar", p: [clubId] }),
      cache: 'force-cache',
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000)
    })

    if (!planesRes.ok) throw new Error('BD error: ' + planesRes.status)
    
    const planes = await planesRes.json()

    return NextResponse.json({
      clubId,
      planes,
      success: true
    })
  } catch (error) {
    console.error('GET /api/tienda/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}
