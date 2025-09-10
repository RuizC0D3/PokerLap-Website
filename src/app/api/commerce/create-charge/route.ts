import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPlanById } from '../../../../lib/catalogo';

const C_API_BASE = process.env.COINBASE_COMMERCE_API_BASE || 'https://api.commerce.coinbase.com';
const C_API_KEY  = process.env.COINBASE_COMMERCE_API_KEY!;
const WEB_URL    = process.env.NEXT_PUBLIC_WEB_URL!;

/**
 * Body esperado: { planId: string }
 */
export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    if (!planId) return NextResponse.json({ error: 'Falta planId' }, { status: 400 });

    const plan = getPlanById(planId);
    if (!plan) return NextResponse.json({ error: 'Plan no encontrado' }, { status: 404 });

    // Identifica al usuario desde tu cookie actual
    const rawUser = cookies().get('pokerlUser')?.value;
    const user = rawUser ? JSON.parse(decodeURIComponent(rawUser)) : null;
    const userId = user?.idUser || user?.ID_User || 'anon';

    // Construye metadata y redirecciones
    const reference = `plan-${plan.id}-${userId}-${Date.now()}`.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 60);

    const payload = {
      name: `PokerLap - ${plan.name}`,
      description: plan.description,
      pricing_type: 'fixed_price',
      local_price: {
        amount: plan.amountUsd.toString(),  // USD para precio fijo
        currency: 'USD',
      },
      redirect_url: `${WEB_URL}/tienda/resultado?status=success&plan=${plan.id}&m=coinbase`,
      cancel_url:   `${WEB_URL}/tienda?status=cancel`,
      metadata: { planId: plan.id, userId, reference },
    };

    const res = await fetch(`${C_API_BASE}/charges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': C_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data?.hosted_url) {
      return NextResponse.json({ error: 'Coinbase API error', detail: data }, { status: 502 });
    }

    // hosted_url = URL del checkout de Coinbase para redirigir al usuario
    return NextResponse.json({ url: data.hosted_url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error inesperado' }, { status: 500 });
  }
}
