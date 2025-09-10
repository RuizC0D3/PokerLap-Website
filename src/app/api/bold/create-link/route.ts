
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPlanById } from '../../../../lib/catalogo';

// ===== Configuración y modos =====
const BOLD_API_BASE = process.env.BOLD_API_BASE || 'https://integrations.api.bold.co';
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

// Toggle de entorno:
// - mock     → no llama a Bold; devuelve una URL falsa (ideal para desarrollo sin llaves)
// - sandbox  → usa llave de pruebas si existe (BOLD_TEST_IDENTITY_KEY) y, si no, cae a BOLD_IDENTITY_KEY
// - prod     → usa BOLD_IDENTITY_KEY (producción)
const BOLD_MODE = (process.env.BOLD_MODE || 'prod').toLowerCase() as 'mock' | 'sandbox' | 'prod';
const BOLD_TEST_IDENTITY_KEY = process.env.BOLD_TEST_IDENTITY_KEY || '';
const BOLD_IDENTITY_KEY = process.env.BOLD_IDENTITY_KEY || '';

function getApiKey(): string {
  if (BOLD_MODE === 'mock') return '';
  if (BOLD_MODE === 'sandbox') return BOLD_TEST_IDENTITY_KEY || BOLD_IDENTITY_KEY;
  return BOLD_IDENTITY_KEY;
}

// ===== Utilidades =====
function sanitizeRef(s: string, max = 60) {
  return s.replace(/[^A-Za-z0-9_-]/g, '').slice(0, max);
}

function getUserIdFromCookie(): string {
  try {
    const raw = cookies().get('pokerlUser')?.value;
    if (!raw) return 'anon';
    const user = JSON.parse(decodeURIComponent(raw));
    return user?.idUser || user?.ID_User || 'anon';
  } catch {
    return 'anon';
  }
}

// El catálogo puede ser de dos formas según tu implementación previa:
// 1) { amount: number, currency: 'COP', payment_methods?: string[] }
// 2) { amountCop: number } (cuando también usas Coinbase para USD)
function resolveAmountAndCurrency(plan: any): { amount: number; currency: 'COP' } {
  // prioridad a amountCop si existe (nuevo catálogo con COP dedicado)
  if (typeof plan?.amountCop === 'number') return { amount: plan.amountCop, currency: 'COP' };
  // compatibilidad con el catálogo original
  const amount = typeof plan?.amount === 'number' ? plan.amount : 0;
  const currency = (plan?.currency || 'COP').toUpperCase();
  return { amount, currency: currency === 'COP' ? 'COP' : 'COP' as const }; // forzamos COP para Bold
}

type BoldCreateLinkBody = {
  amount_type: 'CLOSE';
  amount: { total: number };
  currency: 'COP';
  description?: string;
  reference?: string;
  callback_url?: string;
  payment_methods?: Array<'CREDIT_CARD' | 'PSE' | 'NEQUI' | 'BOTON_BANCOLOMBIA'>;
  image_url?: string;
};

type BoldCreateLinkResponse = {
  payload?: {
    payment_link?: string;             // LNK_*
    url?: string;                      // https://checkout.bold.co/LNK_*
  };
  errors?: Array<{ code: string; message: string }>;
};

export async function POST(req: Request) {
  try {
    // 1) Entrada
    let planId: string | undefined;
    try {
      const body = await req.json();
      planId = body?.planId;
    } catch {
      return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
    }

    if (!planId) {
      return NextResponse.json({ error: 'Falta planId' }, { status: 400 });
    }

    // 2) Plan
    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan no encontrado' }, { status: 404 });
    }

    // 3) Usuario y referencia
    const userId = getUserIdFromCookie();
    const reference = sanitizeRef(`plan-${plan.id}-${userId}-${Date.now()}`);

    // 4) Monto y moneda (forzamos COP para Bold)
    const { amount, currency } = resolveAmountAndCurrency(plan);
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Monto inválido para el plan' }, { status: 400 });
    }

    // 5) Cuerpo hacia Bold
    const body: BoldCreateLinkBody = {
      amount_type: 'CLOSE',
      amount: { total: amount },
      currency, // 'COP'
      description: String(plan.description || '').slice(0, 100),
      reference, // opcional: si no lo envías, Bold usa el LNK_* como referencia
      callback_url: `${WEB_URL}/tienda/resultado?plan=${plan.id}`,
      payment_methods:
        plan?.payment_methods ??
        (['CREDIT_CARD', 'PSE', 'NEQUI', 'BOTON_BANCOLOMBIA'] as BoldCreateLinkBody['payment_methods']),
      // image_url: plan?.image_url,
    };

    // 6) Modo MOCK (sin llamadas externas) → útil para desarrollo local
    if (BOLD_MODE === 'mock') {
      const fake = `${WEB_URL}/tienda?status=success&fake=bold&plan=${plan.id}&ref=${reference}`;
      return NextResponse.json({ url: fake });
    }

    // 7) Validación de credenciales en sandbox/prod
    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Falta BOLD_IDENTITY_KEY (o BOLD_TEST_IDENTITY_KEY en sandbox)' },
        { status: 500 },
      );
    }

    // 8) Llamada a Bold con timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000); // 12s

    let res: Response;
    try {
      res = await fetch(`${BOLD_API_BASE}/online/link/v1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Bold: Authorization: x-api-key <llave>
          Authorization: `x-api-key ${apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: 'no-store',
      });
    } catch (e: any) {
      clearTimeout(timer);
      // AbortError u otros
      const msg =
        e?.name === 'AbortError'
          ? 'Tiempo de espera agotado al conectar con Bold'
          : (e?.message || 'No se pudo conectar con Bold');
      return NextResponse.json({ error: msg }, { status: 504 });
    } finally {
      clearTimeout(timer);
    }

    let data: BoldCreateLinkResponse;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json({ error: 'Respuesta inválida de Bold' }, { status: 502 });
    }

    if (!res.ok || (data?.errors && data.errors.length)) {
      return NextResponse.json(
        { error: 'Bold API error', detail: data?.errors || data },
        { status: 502 },
      );
    }

    const url = data?.payload?.url;
    if (!url) {
      return NextResponse.json({ error: 'No se recibió URL de Bold' }, { status: 502 });
    }

    // 9) Éxito
    return NextResponse.json({ url });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error inesperado' },
      { status: 500 },
    );
  }
}
