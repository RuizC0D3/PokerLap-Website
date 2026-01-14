// src/app/api/webhooks/coinbase/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET || ''

function verifyCoinbaseSignature(rawBody: string, sigHeader: string | null): boolean {
  if (!sigHeader) return false

  const computed = crypto
    .createHmac('sha256', COINBASE_WEBHOOK_SECRET)
    .update(rawBody, 'utf8')
    .digest('hex')

  const a = Buffer.from(computed, 'utf8')
  const b = Buffer.from(sigHeader, 'utf8')

  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  try {
    const raw = await req.text()
    const signature = req.headers.get('x-cc-webhook-signature')

    console.log('[COINBASE] 🔔 Webhook recibido')

    // ✅ Verificar firma
    if (!verifyCoinbaseSignature(raw, signature)) {
      console.warn('[COINBASE] ❌ Firma inválida')
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
    }

    const evt = JSON.parse(raw)
    const eventType = evt?.event?.type || evt?.type

    console.log('[COINBASE] 📋 Evento:', eventType)

    // ✅ Solo procesar confirmados
    if (eventType !== 'charge:confirmed') {
      console.log('[COINBASE] ⏳ No confirmado, ignorando:', eventType)
      return NextResponse.json({ received: true })
    }

    // ✅ Extraer datos (incluyendo reference)
    const chargeData = evt?.event?.data || evt?.data
    const metadata = chargeData?.metadata || {}
    const { userId, planId, reference } = metadata  
    const chargeId = chargeData?.id
    const amount = chargeData?.pricing?.local?.amount

    console.log('[COINBASE] 💰 Pago:', { userId, planId, chargeId, reference, amount })

    // ✅ Validación completa
    if (!userId || !planId || !chargeId) {
      console.warn('[COINBASE] ❌ Falta datos en metadata:', { userId, planId, chargeId, reference })
      return NextResponse.json({ received: true })
    }

    // ✅ Actualizar BD
    try {
      const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          op: 'setPlanPagado',
          userId,
          planId,
          reference,
          provider: 'coinbase',
          transactionId: chargeId,
          amount,
        })
      })
      console.log('[COINBASE] ✅ Backend respondió:', backendRes.status)
    } catch (err) {
      console.error('[COINBASE] ❌ Error notificando backend:', err)
      // No bloquea - Coinbase reintentará
    }

    return NextResponse.json({ received: true, processed: true })

  } catch (error: any) {
    console.error('[COINBASE] 💥 Error:', error?.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
