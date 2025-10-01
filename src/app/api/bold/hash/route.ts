// src/app/api/bold/hash/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency } = await req.json()
    if (!orderId || !amount || !currency) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
    }
    const secret = process.env.BOLD_SECRET_KEY || ''
    if (!secret) {
      return NextResponse.json({ error: 'Falta BOLD_SECRET_KEY' }, { status: 500 })
    }

    // Cadena: {orderId}{amount}{currency}{secretKey}
    const cadena = `${orderId}${amount}${currency}${secret}`
    const enc = new TextEncoder()
    const data = enc.encode(cadena)
    const buf = await crypto.subtle.digest('SHA-256', data)
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')

    return NextResponse.json({ signature: hex })
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'Error' }, { status: 500 })
  }
}
