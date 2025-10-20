// src/app/api/commerce/create-charge/route.ts - VERSIÓN CORREGIDA
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPlanById } from '../../../../lib/catalogo'

const C_API_BASE = process.env.COINBASE_COMMERCE_API_BASE || 'https://api.commerce.coinbase.com'
const C_API_KEY = process.env.COINBASE_COMMERCE_API_KEY || ''
const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000').replace(/\/+$/, '')

export async function POST(req: Request) {
  try {
    const { planId } = await req.json()

    if (!planId) return NextResponse.json({ error: 'Falta planId' }, { status: 400 })

    if (!C_API_KEY)
      return NextResponse.json({ error: 'Falta COINBASE_COMMERCE_API_KEY' }, { status: 500 })

    const plan = getPlanById(planId)
    if (!plan) return NextResponse.json({ error: 'Plan no encontrado' }, { status: 404 })

    const rawUser = cookies().get('pokerlUser')?.value
    const user = rawUser ? JSON.parse(decodeURIComponent(rawUser)) : null
    const userId = user?.idUser || user?.ID_User || 'anon'

    const reference = `plan-${plan.id}-${userId}-${Date.now()}`.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60)

    const payload = {
      name: `PokerLap - ${plan.name}`,
      description: plan.description,
      pricing_type: 'fixed_price',
      local_price: {
        amount: plan.amountUsd.toString(),
        currency: 'USD',
      },
      redirect_url: `${WEB_URL}/tienda/resultado?status=success&plan=${plan.id}&m=coinbase&ref=${reference}`,
      cancel_url: `${WEB_URL}/tienda?status=cancel`,
      metadata: { planId: plan.id, userId, reference },
    }

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
    if (!res.ok) {
      console.error('[COINBASE] Error:', raw)
      return NextResponse.json({ error: 'Coinbase API error', detail: raw }, { status: 502 })
    }

    const data = JSON.parse(raw)
    const hostedUrl = data?.data?.hosted_url || data?.hosted_url
    if (!hostedUrl)
      return NextResponse.json({ error: 'Coinbase no devolvió URL de pago', detail: raw }, { status: 502 })

    return NextResponse.json({ url: hostedUrl })
  } catch (e: any) {
    console.error('[COINBASE] Error inesperado:', e)
    return NextResponse.json({ error: e?.message || 'Error interno' }, { status: 500 })
  }
}
