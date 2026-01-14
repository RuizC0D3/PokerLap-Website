// src/app/api/bold/create-link/route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000').replace(/\/+$/, '')
const MODE = 'prod' as const
const API_BASE_ENV = (process.env.BOLD_API_BASE || 'https://integrations.api.bold.co').replace(/\/+$/, '')

const PROD_KEY = process.env.BOLD_IDENTITY_KEY || ''
const PROD_SECRET = process.env.BOLD_SECRET_KEY || ''

console.log('🔍 BOLD_IDENTITY_KEY exists?', !!PROD_KEY)
console.log('🔍 BOLD_SECRET_KEY exists?', !!PROD_SECRET)

function getApiKey(): string {
  if (!PROD_KEY) {
    console.error('[BOLD] ERROR: BOLD_IDENTITY_KEY no está configurada')
    return ''
  }
  return PROD_KEY
}

function getSecret(): string {
  if (!PROD_SECRET) {
    console.error('[BOLD] ERROR: BOLD_SECRET_KEY no está configurada')
    return ''
  }
  return PROD_SECRET
}

function sanitizeRef(s: string, max = 60) {
  return s.replace(/[^A-Za-z0-9_-]/g, '').slice(0, max)
}

function getUserIdFromCookie(): string {
  try {
    const raw = cookies().get('pokerlUser')?.value
    if (!raw) return 'anon'
    const user = JSON.parse(decodeURIComponent(raw))
    return user?.idUser || user?.ID_User || 'anon'
  } catch {
    return 'anon'
  }
}

const USD_TO_COP = Number(process.env.USD_TO_COP || '4000')

// ✅ Obtiene plan desde BD
async function getPlanFromDb(planId: string) {
  try {
    const payload = { i: 0 }
  const API_TIENDA_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 
                        process.env.NEXT_PUBLIC_TIENDA_URL || 
                        'http://localhost:3000/api/tienda'

  const res = await fetch(`${API_TIENDA_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const raw = await res.text()
    let data = JSON.parse(raw)
    
    let arr = Array.isArray(data) ? data : data?.planes || data?.items || data?.data || []
    if (!Array.isArray(arr)) arr = []
    
    const plan = arr.find((p: any) => String(p.id) === String(planId) || String(p.ID) === String(planId))
    return plan || null
  } catch (e) {
    console.error('[BOLD] Error obteniendo plan de BD:', e)
    return null
  }
}

function amountCOP(plan: any) {
  if (typeof plan?.amountCop === 'number' && plan.amountCop > 0) {
    return Math.max(0, Math.round(Number(plan.amountCop)))
  }

  const usd =
    typeof plan?.amountUsd === 'number'
      ? plan.amountUsd
      : typeof plan?.amount === 'number'
      ? plan.amount
      : 0

  const cop = usd * USD_TO_COP
  return Math.max(0, Math.round(cop))
}

export async function POST(req: Request) {
  try {
    const { planId } = await req.json().catch(() => ({}))

    if (!planId)
      return NextResponse.json({ error: 'Falta planId' }, { status: 400 })

    // ✅ Obtiene plan desde BD
    const plan = await getPlanFromDb(String(planId))

    if (!plan)
      return NextResponse.json({ error: 'Plan no encontrado', planId }, { status: 404 })

    const amount = amountCOP(plan)

    if (!amount)
      return NextResponse.json({ error: 'Monto inválido' }, { status: 400 })

    const key = getApiKey()

    if (!key)
      return NextResponse.json({ error: 'Configuración Bold incompleta: falta API key' }, { status: 500 })

    const ref = sanitizeRef(`plan-${plan.id}-${getUserIdFromCookie()}-${Date.now()}`)

    const returnUrl = `${WEB_URL}/tienda/resultado?status=success&plan=${encodeURIComponent(plan.id)}&ref=${ref}`
    const cancelUrl = `${WEB_URL}/tienda/resultado?status=cancel&plan=${encodeURIComponent(plan.id)}`

    const payload = {
      amount_type: 'CLOSE',
      amount: { total: amount },
      currency: 'COP',
      description: String(plan.description || '').slice(0, 100),
      reference: ref,
      callback_url: returnUrl,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      payment_methods: ['CREDIT_CARD', 'PSE', 'NEQUI', 'BOTON_BANCOLOMBIA'],
    }

    const res = await fetch(`${API_BASE_ENV}/online/link/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': key,
      },
      body: JSON.stringify(payload),
    })

    const raw = await res.text()

    if (!res.ok) {
      console.error('[BOLD] Error:', raw)
      return NextResponse.json({ error: 'Bold API error', detail: raw }, { status: 502 })
    }

    const data = JSON.parse(raw)

    const checkout = data?.payload?.url || data?.url || data?.link?.url || (data?.payload?.payment_link ? `https://checkout.bold.co/${data.payload.payment_link}` : null)

    if (!checkout)
      return NextResponse.json({ error: 'Bold 200 sin url', detail: raw || '(sin cuerpo)' }, { status: 502 })

    console.log('✅ Bold link generado:', checkout.substring(0, 50) + '...')
    return NextResponse.json({ url: checkout })

  } catch (e: any) {
    console.error('[BOLD] Error inesperado:', e)
    return NextResponse.json({ error: e?.message || 'Error interno' }, { status: 500 })
  }
}
