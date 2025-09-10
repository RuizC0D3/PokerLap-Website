import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SECRET = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET!;

function verifySignature(rawBody: string, sigHeader: string | null) {
  if (!sigHeader) return false;
  const h = crypto.createHmac('sha256', SECRET).update(rawBody).digest('hex');
  // compara en timing-safe
  const a = Buffer.from(h, 'utf8');
  const b = Buffer.from(sigHeader, 'utf8');
  const aUint8 = new Uint8Array(a.buffer, a.byteOffset, a.length);
  const bUint8 = new Uint8Array(b.buffer, b.byteOffset, b.length);
  return aUint8.length === bUint8.length && crypto.timingSafeEqual(aUint8, bUint8);
}

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get('X-CC-Webhook-Signature');

  if (!verifySignature(raw, signature)) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  const evt = JSON.parse(raw);
  // Eventos típicos: charge:pending, charge:confirmed, charge:failed, etc.
  // Marca como pagado cuando esté CONFIRMED
  const type: string | undefined = evt?.event?.type;

  if (type === 'charge:confirmed') {
    const metadata = evt?.event?.data?.metadata || {};
    const userId = metadata.userId;
    const planId = metadata.planId;
    const reference = metadata.reference;

    // Notifica a tu backend compartido (para que la app móvil vea el plan)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ op: 'set_plan_pagado', userId, planId, reference, provider: 'coinbase', coinbaseEvent: evt }),
      });
    } catch { /* deja que Coinbase reintente si falla, o loguea */ }
  }

  return NextResponse.json({ received: true });
}
