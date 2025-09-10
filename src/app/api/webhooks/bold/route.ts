// src/app/api/webhooks/bold/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';        // para usar crypto de Node
export const dynamic = 'force-dynamic'; // este endpoint no debe cachearse

function verifyBoldSignature(rawBody: string, signatureHeader: string | null) {
  // 1) cuerpo en Base64
  const base64Body = Buffer.from(rawBody, 'utf8').toString('base64');
  // 2) HMAC-SHA256 con tu BOLD_SECRET_KEY → hex
  const secret = process.env.BOLD_SECRET_KEY ?? '';
  const computed = crypto.createHmac('sha256', secret).update(base64Body).digest('hex');
  // 3) comparar con x-bold-signature (hex)
  if (!signatureHeader) return false;
  // timing-safe
  const a = Uint8Array.from(Buffer.from(computed, 'utf8'));
  const b = Uint8Array.from(Buffer.from(signatureHeader, 'utf8'));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  // Lee el body crudo para firmarlo
  const raw = await req.text();
  const signature = req.headers.get('x-bold-signature');

  // **En modo pruebas**, Bold indica que la firma usa clave vacía ('') como secreto.
  // Ajusta BOLD_SECRET_KEY='' cuando pruebes con sandbox.
  const ok = verifyBoldSignature(raw, signature);
  if (!ok) {
    // Responde 400 si quieres rechazar; o 200 y log para evitar reintentos innecesarios
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  // Ahora sí procesa el evento
  const evt = JSON.parse(raw);

  // Ejemplos de tipos: SALE_APPROVED, SALE_REJECTED, VOID_APPROVED, VOID_REJECTED
  // evt.data.metadata.reference contiene tu referencia externa (si la enviaste)
  if (evt?.type === 'SALE_APPROVED') {
    const ref = evt?.data?.metadata?.reference; // e.g. plan-basic-<userId>-<ts>
    const userId = ref?.split('-')[2] ?? null;

    // Marca el plan como activo en tu backend compartido (app móvil)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/db`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Ajusta este payload a tu backend real
        body: JSON.stringify({
          op: 'set_plan_pagado',
          userId,
          reference: ref,
          boldEvent: evt,
        }),
      });
    } catch (e) {
      // No bloquees el 200: Bold reintenta webhooks si fallan
    }
  }

  // Responde rápido (<=2s)
  return NextResponse.json({ received: true });
}
