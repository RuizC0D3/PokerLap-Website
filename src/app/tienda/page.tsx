'use client';
import { useState } from 'react';
import { CATALOGO } from '../../lib/catalogo';

export default function TiendaPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pagarBold = async (planId: string) => {
    setError(null); setLoading(`bold:${planId}`);
    try {
      const r = await fetch('/api/bold/create-link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId }) });
      const d = await r.json(); if (!r.ok || !d?.url) throw new Error(d?.error || 'No se pudo crear link de pago');
      window.location.href = d.url;
    } catch (e: any) { setError(e.message || 'Error con Bold'); } finally { setLoading(null); }
  };

  const pagarCoinbase = async (planId: string) => {
    setError(null); setLoading(`coinbase:${planId}`);
    try {
      const r = await fetch('/api/commerce/create-charge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId }) });
      const d = await r.json(); if (!r.ok || !d?.url) throw new Error(d?.error || 'No se pudo crear cargo');
      window.location.href = d.url;
    } catch (e: any) { setError(e.message || 'Error con Coinbase'); } finally { setLoading(null); }
  };

  const fmtCOP = (n: number) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const fmtUSD = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-6">Tienda</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATALOGO.map(p => (
          <div key={p.id} className="rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600 mt-1">{p.description}</p>

            <div className="mt-4 space-y-1">
              <div className="text-sm text-gray-500">Precio en COP (Bold)</div>
              <div className="text-2xl font-bold">{fmtCOP(p.amountCop)}</div>
            </div>

            <div className="mt-2 space-y-1">
              <div className="text-sm text-gray-500">Precio en USD (Cripto)</div>
              <div className="text-xl font-semibold">{fmtUSD(p.amountUsd)}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                className="w-full rounded-xl py-2 border"
                disabled={loading === `bold:${p.id}`}
                onClick={() => pagarBold(p.id)}
              >
                {loading === `bold:${p.id}` ? 'Redirigiendo…' : 'Pagar con Bold (COP)'}
              </button>

              <button
                className="w-full rounded-xl py-2 border"
                disabled={loading === `coinbase:${p.id}`}
                onClick={() => pagarCoinbase(p.id)}
              >
                {loading === `coinbase:${p.id}` ? 'Redirigiendo…' : 'Pagar con Cripto (Coinbase)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
