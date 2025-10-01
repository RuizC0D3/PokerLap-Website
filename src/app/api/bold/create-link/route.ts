// src/app/api/bold/create-link/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPlanById } from '../../../../lib/catalogo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* ========= ENV ========= */
const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000').replace(/\/+$/, '')
const MODE = (process.env.BOLD_MODE || 'sandbox').toLowerCase() as 'mock' | 'sandbox' | 'prod'
const API_BASE_ENV = (process.env.BOLD_API_BASE || 'https://integrations.api.bold.co').replace(/\/+$/, '')
const TEST_KEY = process.env.BOLD_TEST_IDENTITY_KEY || ''
const PROD_KEY = process.env.BOLD_IDENTITY_KEY || ''

/* ========= HELPERS ========= */
function getApiKey(): string {
  if (MODE === 'mock') return ''
  if (MODE === 'sandbox') return TEST_KEY || PROD_KEY
  return PROD_KEY
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
  } catch { return 'anon' }
}
function amountCOP(plan: any) {
  const n = typeof plan?.amountCop === 'number'
    ? plan.amountCop
    : (typeof plan?.amount === 'number' ? plan.amount : 0)
  return Math.max(0, Math.round(Number(n)))
}

function apiKey() {
  if (MODE === 'sandbox') return TEST_KEY || PROD_KEY
  if (MODE === 'prod') return PROD_KEY
  return ''
}
function userIdFromCookie() {
  try {
    const raw = cookies().get('pokerlUser')?.value
    if (!raw) return 'anon'
    const u = JSON.parse(decodeURIComponent(raw))
    return u?.idUser || u?.ID_User || 'anon'
  } catch { return 'anon' }
}
function cleanRef(s: string) { return s.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60) }
function cop(plan: any) {
  const n = typeof plan?.amountCop === 'number' ? plan.amountCop : (typeof plan?.amount === 'number' ? plan.amount : 0)
  return Math.max(0, Math.round(Number(n)))
}

export async function POST(req: Request) {
  try {
    const { planId } = await req.json().catch(() => ({}))
    if (!planId) return NextResponse.json({ error: 'Falta planId' }, { status: 400 })

    const plan = getPlanById(String(planId))
    if (!plan) return NextResponse.json({ error: 'Plan no encontrado', planId }, { status: 404 })

    const amount = cop(plan)
    if (!amount) return NextResponse.json({ error: 'Monto inválido' }, { status: 400 })

    if (MODE === 'mock') {
      const fake = `${WEB_URL}/tienda/resultado?status=success&fake=bold&plan=${encodeURIComponent(plan.id)}&ref=mock-${Date.now()}`
      return NextResponse.json({ url: fake })
    }

    const key = apiKey()
    if (!key) return NextResponse.json({ error: 'Falta Identity Key (BOLD_TEST_IDENTITY_KEY/BOLD_IDENTITY_KEY)' }, { status: 500 })

    const ref = cleanRef(`plan-${plan.id}-${userIdFromCookie()}-${Date.now()}`)
    const return_url = `${WEB_URL}/tienda/resultado?status=success&plan=${encodeURIComponent(plan.id)}&ref=${ref}`
    const cancel_url = `${WEB_URL}/tienda/resultado?status=cancel&plan=${encodeURIComponent(plan.id)}`

    const payload = {
      amount_type: 'CLOSE',
      amount: { total: amount },
      currency: 'COP',
      description: String(plan.description || '').slice(0, 100),
      reference: ref,
      callback_url: return_url,
      return_url,
      cancel_url,
      payment_methods: ['CREDIT_CARD','PSE','NEQUI','BOTON_BANCOLOMBIA'],
    }

    // 👇 ENDPOINT Y HEADER FIJOS, LOS CORRECTOS PARA SANDBOX
    const url = 'https://integrations.api.bold.co/online/link/v1'

    // logs de servidor (útiles si falla)
    console.log('[BOLD] mode=', MODE, 'url=', url, 'keyLen=', key.length)
    console.log('[BOLD] payload=', JSON.stringify(payload))

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': key,            // ← ESTE es el bueno
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const raw = await res.text()
    console.log('[BOLD] status=', res.status, res.statusText)
    console.log('[BOLD] raw=', raw)

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Bold API error', detail: `Bold ${res.status} ${res.statusText} @ ${url}\n${raw || '(sin cuerpo)'}` },
        { status: 502 }
      )
    }

    let data: any = null; try { data = raw ? JSON.parse(raw) : null } catch {}

    const checkout =
      data?.payload?.url ||
      data?.url ||
      data?.link?.url ||
      (data?.payload?.payment_link ? `https://checkout.bold.co/${data.payload.payment_link}` : null)

    if (!checkout) {
      return NextResponse.json(
        { error: 'Bold 200 sin url', detail: raw || '(sin cuerpo)' },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: checkout })
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'Error inesperado' }, { status: 500 })
  }
}
