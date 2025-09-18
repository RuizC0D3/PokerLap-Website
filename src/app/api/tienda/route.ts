import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UPSTREAM = 'https://api.pkti.me/tienda';

// Helper para intentar una llamada y devolver status + body
async function attempt(init: RequestInit, url?: string) {
  const res = await fetch(url ?? UPSTREAM, { cache: 'no-store', redirect: 'follow', ...init });
  const text = await res.text();
  const ok = res.ok && text && text.trim() !== 'false 6';
  return { ok, status: res.status, headers: Object.fromEntries(res.headers.entries()), body: text };
}

// Probamos varias formas (POST JSON, POST form, GET con query) y diferentes headers
async function tryFetches(i: string, textEnc?: string, debug = false) {
  const cookieLine = textEnc
    ? `textEnc=${encodeURIComponent(textEnc)}; textenc=${encodeURIComponent(textEnc)}; TextEnc=${encodeURIComponent(textEnc)}`
    : '';

  const commonHeaders: HeadersInit = {
    'Accept': 'application/json',
    // muchos backends validan estos:
    'Origin': 'https://www.pokerlap.com',
    'Referer': 'https://www.pokerlap.com/',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36',
    ...(textEnc ? { Cookie: cookieLine } : {}),
    // variantes por si leen un header "propietario"
    ...(textEnc ? {
      'textEnc': textEnc,
      'textenc': textEnc,
      'TextEnc': textEnc,
      'X-TextEnc': textEnc,
      'X-Textenc': textEnc,
    } : {}),
  };

  const attempts: Array<{ label: string; res: Awaited<ReturnType<typeof attempt>> }> = [];

  // 1) POST JSON
  attempts.push({
    label: 'POST json',
    res: await attempt({
      method: 'POST',
      headers: { ...commonHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ i: Number(i), ...(textEnc ? { textEnc } : {}) }),
    }),
  });

  // 2) POST x-www-form-urlencoded
  const form = new URLSearchParams({ i });
  if (textEnc) form.set('textEnc', textEnc);
  attempts.push({
    label: 'POST form',
    res: await attempt({
      method: 'POST',
      headers: { ...commonHeaders, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    }),
  });

  // 3) GET con query
  const u = new URL(UPSTREAM);
  u.searchParams.set('i', i);
  if (textEnc) u.searchParams.set('textEnc', textEnc);
  attempts.push({
    label: 'GET query',
    res: await attempt({ method: 'GET', headers: { ...commonHeaders } }, u.toString()),
  });

  // Si alguno es válido (no "false 6"), lo devolvemos tal cual
  for (const a of attempts) {
    if (a.res.ok) {
      try {
        const json = JSON.parse(a.res.body);
        return NextResponse.json(debug ? { ok: true, via: a.label, json } : json, {
          headers: { 'Cache-Control': 'no-store' },
        });
      } catch {
        return new NextResponse(debug ? JSON.stringify({ ok: true, via: a.label, raw: a.res.body }) : a.res.body, {
          headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
        });
      }
    }
  }

  // Si ninguno resultó, devolvemos debug de todos
  if (debug) {
    return NextResponse.json(
      {
        ok: false,
        reason: 'upstream_error_or_false6',
        attempts: attempts.map(a => ({
          label: a.label,
          status: a.res.status,
          sample: a.res.body.slice(0, 300),
        })),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as any;
    const i = (body?.i ?? '').toString();
    const textEnc = body?.textEnc ? String(body.textEnc) : undefined;
    const debug = Boolean(body?.debug);
    if (!i) return NextResponse.json({ error: 'missing i' }, { status: 400 });
    return await tryFetches(i, textEnc, debug);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'proxy_error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const i = (url.searchParams.get('i') ?? '').toString();
  const textEnc = url.searchParams.get('textEnc') ?? undefined;
  const debug = url.searchParams.get('debug') === '1';
  if (!i) return NextResponse.json({ error: 'missing i' }, { status: 400 });
  return await tryFetches(i, textEnc, debug);
}
