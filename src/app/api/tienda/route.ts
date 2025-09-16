import { NextResponse } from 'next/server'

const UPSTREAM = 'https://api.pkti.me/tienda'
export const dynamic = 'force-dynamic' // no cache

export async function POST(req: Request) {
  try {
    const payload = await req.json()
    const r = await fetch(UPSTREAM, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
    const data = await r.json()
    return NextResponse.json(data, { status: r.status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Proxy tienda error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const i = searchParams.get('i') ?? ''
    const r = await fetch(`${UPSTREAM}?i=${encodeURIComponent(i)}`, { method: 'GET', cache: 'no-store' })
    const data = await r.json()
    return NextResponse.json(data, { status: r.status })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Proxy tienda error' }, { status: 500 })
  }
}
