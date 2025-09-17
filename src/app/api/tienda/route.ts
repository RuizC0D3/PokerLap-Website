import { NextResponse } from 'next/server'

const UPSTREAM = 'https://api.pkti.me/tienda'
export const dynamic = 'force-dynamic'

function getCookieVal(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';').map(s => s.trim())
  for (const p of parts) {
    const [k, ...rest] = p.split('=')
    if (k === name) return decodeURIComponent(rest.join('=') || '')
  }
  return null
}

async function forward(method: 'GET' | 'POST', input: { i?: string; textEnc?: string }, cookieHeader: string | null) {
  const fromBody = input.textEnc
  const fromQuery = input.textEnc
  const fromCookie = getCookieVal(cookieHeader, 'pkti_textEnc')

  const token = fromBody || fromQuery || fromCookie || ''

  const qs = new URLSearchParams()
  if (input.i) qs.set('i', String(input.i))
  if (token) qs.set('textEnc', token)

  const url = method === 'GET'
    ? `${UPSTREAM}?${qs.toString()}`
    : (token ? `${UPSTREAM}?textEnc=${encodeURIComponent(token)}` : UPSTREAM)

  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-textenc': token, authorization: `Bearer ${token}` } : {}),
    },
    cache: 'no-store',
  }

  if (method === 'POST') {
    init.body = JSON.stringify({ i: input.i ? Number(input.i) : undefined, ...(token ? { textEnc: token } : {}) })
  }

  const r = await fetch(url, init)
  const text = await r.text()
  try { return NextResponse.json(JSON.parse(text), { status: r.status }) }
  catch { return new NextResponse(text, { status: r.status }) }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({})) as { i?: number | string; textEnc?: string }
    const cookieHeader = req.headers.get('cookie')
    return await forward('POST', { i: payload?.i ? String(payload.i) : undefined, textEnc: payload?.textEnc }, cookieHeader)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Proxy tienda error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const i = url.searchParams.get('i') || undefined
    const textEnc = url.searchParams.get('textEnc') || undefined
    const cookieHeader = req.headers.get('cookie')
    return await forward('GET', { i, textEnc }, cookieHeader)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Proxy tienda error' }, { status: 500 })
  }
}
