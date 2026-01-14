// src/app/api/coinbase-charge/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FEE_WALLET = 0.06

const C_API_BASE = process.env.COINBASE_COMMERCE_API_BASE || 'https://api.commerce.coinbase.com'
const C_API_KEY = process.env.COINBASE_COMMERCE_API_KEY || process.env.NEXT_PUBLIC_COINBASE_API_KEY
console.log('[COINBASE] API Key disponible:', !!C_API_KEY)

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000').replace(/\/+$/, '')

function sanitizeRef(s: string, max = 60) {
  return s.replace(/[^A-Za-z0-9_-]/g, '').slice(0, max)
}

function getUserId() {
  try {
    const raw = cookies().get('pokerlUser')?.value
    if (!raw) return 'anon'
    const user = JSON.parse(decodeURIComponent(raw))
    return user?.idUser || user?.ID_User || 'anon'
  } catch {
    return 'anon'
  }
}

export async function POST(req: Request) {
  console.log('[COINBASE] 🟢 RUTA LLAMADA OK')
  console.log('[COINBASE] ENV VARS:', {
    hasKey: !!C_API_KEY,
    apiBase: C_API_BASE,
    webUrl: WEB_URL,
  })

  try {
    const body = await req.json().catch(() => ({}))
    const { planId, amountUsd } = body as { planId?: string; amountUsd?: number }

    console.log('[COINBASE] 📥 Recibido:', { planId, amountUsd })

    // ✅ VALIDACIÓN DEL CARRITO (SIN BD)
    if (!planId) {
      return NextResponse.json({ error: 'Falta planId' }, { status: 400 })
    }

    if (!amountUsd || amountUsd <= 0) {
      console.error('[COINBASE] ❌ Monto USD inválido:', amountUsd)
      return NextResponse.json({ error: 'Monto USD inválido del carrito' }, { status: 400 })
    }

    if (!C_API_KEY) {
      console.error('[COINBASE] ❌ Falta COINBASE_COMMERCE_API_KEY')
      return NextResponse.json({ error: 'Falta COINBASE_COMMERCE_API_KEY en servidor' }, { status: 500 })
    }

    // ✅ USA DATOS DEL CARRITO DIRECTO
    const baseUsd = Number(amountUsd)
    const totalUsd = baseUsd * (1 + FEE_WALLET)
    const totalUsdFixed = Number(totalUsd.toFixed(2))

    const userId = getUserId()
    const reference = `plan-${sanitizeRef(planId)}-${userId}-${Date.now()}`.slice(0, 60)

    console.log('[COINBASE] 💰 Cobrando desde carrito:', {
      planId,
      baseUsd,
      totalUsd: totalUsdFixed,
      reference,
    })

    const payload = {
      name: `PokerLap - Plan ${planId}`,
      description: `Compra de plan PokerLap (${fmtUSD(baseUsd)} + 6% fee)`,
      pricing_type: 'fixed_price',
      local_price: {
        amount: totalUsdFixed.toFixed(2),
        currency: 'USD',
      },
      redirect_url: `${WEB_URL}/tienda/resultado?status=success&plan=${encodeURIComponent(planId)}&m=coinbase&ref=${encodeURIComponent(reference)}`,
      cancel_url: `${WEB_URL}/tienda?status=cancel`,
      metadata: {
        planId,
        userId,
        reference,
        baseAmountUsd: baseUsd,
        feePercent: 6,
      },
    }

    console.log('[COINBASE] 🌐 Enviando a Coinbase:', `${C_API_BASE}/charges`)

    const res = await fetch(`${C_API_BASE}/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': C_API_KEY,
        'X-CC-Version': '2018-03-22',
      },
      body: JSON.stringify(payload),
    })

    const raw = await res.text()
    console.log('[COINBASE] 🌐 Coinbase status:', res.status, 'response:', raw.substring(0, 200))

    if (!res.ok) {
      console.error('[COINBASE] ❌ Error status', res.status, ':', raw)
      return NextResponse.json(
        { error: 'Coinbase API error', status: res.status, detail: raw },
        { status: 502 }
      )
    }

    let data: any
    try {
      data = JSON.parse(raw)
    } catch (e) {
      console.error('[COINBASE] ❌ Error parseando respuesta:', raw)
      return NextResponse.json(
        { error: 'Coinbase response parse error', detail: raw },
        { status: 502 }
      )
    }

    const hostedUrl = data?.data?.hosted_url || data?.hosted_url
    if (!hostedUrl) {
      console.error('[COINBASE] ❌ No hosted_url en respuesta:', JSON.stringify(data).substring(0, 200))
      return NextResponse.json(
        { error: 'Coinbase no devolvió URL de pago', detail: JSON.stringify(data) },
        { status: 502 }
      )
    }

    console.log('[COINBASE] ✅ ✅ CHARGE CREADO! URL:', hostedUrl.substring(0, 50) + '...')
    return NextResponse.json({ url: hostedUrl, reference })

  } catch (e: any) {
    console.error('[COINBASE] 💥 Error inesperado:', e?.message, e?.stack)
    return NextResponse.json(
      {
        error: e?.message || 'Error interno',
        stack: process.env.NODE_ENV === 'development' ? e?.stack : undefined,
      },
      { status: 500 }
    )
  }
}

function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}
