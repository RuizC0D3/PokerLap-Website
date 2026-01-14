// src/app/api/webhooks/bold/route.ts
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const BOLD_SECRET_KEY = process.env.BOLD_SECRET_KEY || ''

function verifyBoldSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false

  const secret = BOLD_SECRET_KEY
  const computed = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex')

  const a = Buffer.from(computed, 'utf8')
  const b = Buffer.from(signatureHeader, 'utf8')
  
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(req: Request) {
  try {
    const raw = await req.text()
    
    const signature = 
      req.headers.get('x-bold-signature') ||
      req.headers.get('x-bold-webhook-signature') ||
      req.headers.get('x-signature')

    console.log('[BOLD] 🔔 Webhook recibido')
    console.log('[BOLD] Headers keys:', Array.from(req.headers.keys()).filter(k => k.includes('sig') || k.includes('bold')))

    if (!verifyBoldSignature(raw, signature)) {
      console.warn('[BOLD] ❌ Firma inválida - signature:', signature?.substring(0, 20) + '...')
      return NextResponse.json({ error: 'Firma inválida' }, { status: 400 })
    }

    const evt = JSON.parse(raw)
    console.log('[BOLD] 📋 Evento:', { type: evt?.type, reference: evt?.data?.metadata?.reference })

    const reference = evt?.data?.metadata?.reference || evt?.reference
    const transactionId = evt?.data?.id || evt?.id
    const status = evt?.data?.status || evt?.status || evt?.type

    const parts = reference?.split('-') || []
    const planType = parts[0]
    const planId = parts[1]
    const userId = parts[2]

    console.log('[BOLD] 💰 Pago:', { planId, userId, transactionId, status })

    const successStatuses = ['COMPLETED', 'APPROVED', 'COMMITTED', 'SALE_APPROVED', 'SALEAPPROVED', 'TRANSACTIONSTATE']
    const isSuccess = successStatuses.some(s => status?.toUpperCase().includes(s)) || evt?.type === 'SALEAPPROVED'

    if (!isSuccess) {
      console.log('[BOLD] ⏳ Status no exitoso, ignorando:', status)
      return NextResponse.json({ received: true })
    }

    if (!userId || !planId) {
      console.warn('[BOLD] ❌ Falta planId/userId:', { planId, userId, reference })
      return NextResponse.json({ received: true })
    }

    // ✅ ACTUALIZAR BD
    try {
      const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          op: 'setPlanPagado',
          userId,
          planId,
          reference,
          provider: 'bold',
          transactionId,
        })
      })
      console.log('[BOLD] ✅ Backend respondió:', backendRes.status)
    } catch (err) {
      console.error('[BOLD] ❌ Error backend:', err)
    }

    return NextResponse.json({ received: true, processed: true })
  } catch (error: any) {
    console.error('[BOLD] 💥 Error:', error?.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
