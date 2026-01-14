// src/app/api/bold/hash/route.ts - VERSIÓN FINAL

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency } = await req.json()

    if (!orderId || !amount || !currency) {
      return NextResponse.json({
        error: 'Faltan parámetros: orderId, amount o currency'
      }, { status: 400 })
    }

    // OBTENER SECRET
    const secret = process.env.BOLD_SECRET_KEY
    console.log('[BOLD] Secret disponible:', !!secret, 'Keys:', Object.keys(process.env).filter(k => k.includes('BOLD')))

    console.log('[BOLD HASH] 🔍 Verificación:')
    console.log('  - Secret exists:', !!secret)
    console.log('  - orderId:', orderId)
    console.log('  - amount:', amount)
    console.log('  - currency:', currency)

    if (!secret) {
      console.error('[BOLD HASH] ❌ BOLD_SECRET_KEY vacío')
      return NextResponse.json({
        error: 'BOLD_SECRET_KEY no disponible en servidor',
        debug: {
          has_secret: !!process.env.BOLD_SECRET_KEY,
          env_vars: Object.keys(process.env).filter(k => k.includes('BOLD'))
        }
      }, { status: 500 })
    }

    // CREAR FIRMA SHA256
    // Orden EXACTO: orderId + amount + currency + secret
    const cadena = `${orderId}${amount}${currency}${secret}`
    
    console.log('[BOLD HASH] 📝 String a firmar:', cadena.substring(0, 50) + '...')

    const enc = new TextEncoder()
    const data = enc.encode(cadena)
    const buf = await crypto.subtle.digest('SHA-256', data)
    const signature = Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    console.log('[BOLD HASH] ✅ Firma generada:', signature.substring(0, 20) + '...')

    return NextResponse.json({ 
      signature,
      debug: {
        orderId,
        amount,
        currency
      }
    })

  } catch (e: any) {
    console.error('[BOLD HASH] ❌ Error:', e)
    return NextResponse.json({
      error: e?.message || 'Error al generar firma',
      stack: process.env.NODE_ENV === 'development' ? e?.stack : undefined
    }, { status: 500 })
  }
}