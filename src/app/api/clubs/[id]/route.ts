import { NextResponse } from 'next/server'

function mapDetail(raw: any) {
  const base = {
    id: String(raw?.id ?? raw?._id ?? raw?.slug ?? raw?.code ?? ''),
    name: raw?.name ?? raw?.nombre ?? '',
    city: raw?.city ?? raw?.ciudad ?? '',
    country: raw?.country ?? raw?.pais ?? '',
    players: raw?.players ?? raw?.jugadores ?? null,
    stakes: raw?.stakes ?? raw?.ciegas ?? null,
    schedule: raw?.schedule ?? raw?.horario ?? null,
    logoUrl: raw?.logoUrl ?? raw?.logo_url ?? raw?.logo ?? raw?.image ?? null,
    description: raw?.description ?? raw?.descripcion ?? '',
  }

  const contacts = raw?.contacts ?? {
    whatsapp: raw?.whatsapp ?? raw?.contacto?.whatsapp,
    instagram: raw?.instagram ?? raw?.contacto?.instagram,
    site: raw?.site ?? raw?.web ?? raw?.contacto?.site,
  }

  const list = Array.isArray(raw?.tournaments ?? raw?.torneos)
    ? (raw?.tournaments ?? raw?.torneos)
    : []
  const tournaments = list.map((t: any) => ({
    id: String(t?.id ?? t?._id ?? t?.code ?? t?.slug ?? ''),
    name: t?.name ?? t?.nombre ?? '',
    buyin: t?.buyin ?? t?.compra ?? null,
    date: t?.date ?? t?.fecha ?? null,
    status: t?.status ?? t?.estado ?? 'Activo',
  }))

  return { ...base, contacts, tournaments }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '') || 'https://api.pkti.me'
  const candidates = [
    `${base}/clubs/${id}`,
    `${base}/tienda?resource=clubs&id=${encodeURIComponent(id)}`
  ]

  for (const url of candidates) {
    try {
      const r = await fetch(url, { cache: 'no-store' })
      if (!r.ok) continue
      const j = await r.json()
      const obj = j?.data ?? j?.item ?? j
      if (!obj || typeof obj !== 'object') continue
      return NextResponse.json(mapDetail(obj), { status: 200 })
    } catch {}
  }
  return NextResponse.json({ error: 'upstream_failed' }, { status: 502 })
}
