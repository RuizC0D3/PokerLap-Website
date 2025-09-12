'use client'

import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CATALOGO } from '../../lib/catalogo'

/** ====== Catálogo desde API (fallback a CATALOGO) ====== */
const API_CATALOG = process.env.NEXT_PUBLIC_CATALOG_URL || null

const fmtCOP = (n) =>
  (n ?? 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const fmtUSD = (n) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

async function loadCatalogWithFallback(signal) {
  if (!API_CATALOG) return CATALOGO
  try {
    const r = await fetch(API_CATALOG, { signal })
    if (!r.ok) throw new Error('bad status')
    const data = await r.json()
    if (!Array.isArray(data) || data.length === 0) return CATALOGO
    return data.map((x, i) => ({
      id: String(x.id ?? `p-${i}`),
      name: x.name ?? 'Plan',
      description: x.description ?? '',
      amountCop: Number(x.amountCop ?? x.amount_cop ?? 0),
      amountUsd: Number(x.amountUsd ?? x.amount_usd ?? 0),
      features: Array.isArray(x.features) ? x.features : undefined,
      theme: x.theme ?? null, // opcional: 'navy' | 'yellow' | 'teal' | 'soft'
    }))
  } catch {
    return CATALOGO
  }
}

/** ====== Temas visuales ====== */
const THEMES = {
  navy:  { bg:'#272b40', fg:'#fff',  accent:'#ffffff', pill:'#ffffff' },
  yellow:{ bg:'#f0d426', fg:'#111', accent:'#111111', pill:'#111111' },
  teal:  { bg:'#0c9e98', fg:'#111', accent:'#111111', pill:'#111111' },
  soft:  { bg:'#e9eee9', fg:'#111', accent:'#111111', pill:'#111111' },
}
const THEME_ORDER = ['navy','yellow','teal','soft']
const pickTheme = (idx, theme) => THEMES[theme] || THEMES[THEME_ORDER[idx % THEME_ORDER.length]]

/** ====== Portal (overlay full-screen seguro) ====== */
function Portal({ children }) {
  const [node, setNode] = useState(null)
  useEffect(() => {
    let el = document.getElementById('tienda-modal-root')
    if (!el) {
      el = document.createElement('div')
      el.id = 'tienda-modal-root'
      document.body.appendChild(el)
    }
    setNode(el)
    return () => { /* lo dejamos creado para próximos usos */ }
  }, [])
  if (!node) return null
  return createPortal(children, node)
}

/** ====== Modal de checkout (resumen + método de pago) ====== */
function CheckoutModal({ open, onClose, items, cart, onInc, onDec, onRemove }) {
  const [method, setMethod] = useState('bold')
  const [selected, setSelected] = useState(null)

  const lines = useMemo(() => {
    const map = new Map(items.map(p => [p.id, p]))
    return cart.map(c => (map.get(c.id) ? { ...c, plan: map.get(c.id) } : null)).filter(Boolean)
  }, [cart, items])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!selected && lines.length) setSelected(lines[0].id)
    return () => { document.body.style.overflow = prev }
  }, [open, lines, selected])

  const totalCop = useMemo(() => lines.reduce((a, it) => a + it.plan.amountCop * it.qty, 0), [lines])
  const totalUsd = useMemo(() => lines.reduce((a, it) => a + it.plan.amountUsd * it.qty, 0), [lines])

  const pagar = async () => {
    if (!selected) return
    try {
      const url = method === 'bold' ? '/api/bold/create-link' : '/api/commerce/create-charge'
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selected }),
      })
      const d = await r.json()
      if (!r.ok || !d?.url) throw new Error(d?.error || 'No se pudo crear el checkout')
      window.location.href = d.url
    } catch (e) {
      alert(e?.message || 'Error al iniciar el pago (¿keys configuradas?)')
    }
  }

  if (!open) return null

  return (
    <Portal>
      <div className="tiendaCheckoutOverlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="tiendaCheckout" onClick={(e) => e.stopPropagation()}>
          <h3 className="tiendaCheckout-title">Resumen del carrito</h3>

          {lines.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="tiendaCheckout-list">
                {lines.map((it) => (
                  <div className={`tiendaCheckout-row ${selected === it.id ? 'is-active' : ''}`} key={it.id}>
                    <label className="tiendaCheckout-radio">
                      <input
                        type="radio"
                        name="toPay"
                        checked={selected === it.id}
                        onChange={() => setSelected(it.id)}
                      />
                    </label>

                    <div className="tiendaCheckout-info">
                      <strong>{it.plan.name}</strong>
                      <small>{fmtCOP(it.plan.amountCop)} · {fmtUSD(it.plan.amountUsd)}</small>
                    </div>

                    <div className="tiendaCheckout-qty">
                      <button onClick={() => onDec(it.id)} disabled={it.qty <= 1}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => onInc(it.id)}>+</button>
                    </div>

                    <button className="tiendaCheckout-remove" title="Quitar" onClick={() => onRemove(it.id)}>×</button>
                  </div>
                ))}
              </div>

              <div className="tiendaCheckout-totals">
                <span>Total (COP): <b>{fmtCOP(totalCop)}</b></span>
                <span>Total (USD): <b>{fmtUSD(totalUsd)}</b></span>
              </div>

              <div className="tiendaCheckout-method">
                <span>Método de pago:</span>
                <label className={`method-btn ${method === 'bold' ? 'selected' : ''}`}>
                  <input type="radio" name="method" checked={method === 'bold'} onChange={() => setMethod('bold')} />
                  Bold (COP)
                </label>
                <label className={`method-btn ${method === 'coinbase' ? 'selected' : ''}`}>
                  <input type="radio" name="method" checked={method === 'coinbase'} onChange={() => setMethod('coinbase')} />
                  Coinbase (Cripto)
                </label>
              </div>

              <div className="tiendaCheckout-actions">
                <button className="btn btn-secondary" onClick={onClose}>Seguir comprando</button>
                <button className="btn btn-primary" onClick={pagar}>Pagar</button>
              </div>
            </>
          )}
        </div>

        <style jsx>{`
          .tiendaCheckoutOverlay{
            position:fixed; inset:0; width:100vw; height:100vh;
            background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center;
            z-index:2147483647;
          }
          .tiendaCheckout{
            width:100%; max-width:760px; max-height:80vh; overflow:auto;
            background:#fff; color:#111; border-radius:18px; padding:18px;
            box-shadow:0 10px 30px rgba(0,0,0,.25);
          }
          .tiendaCheckout-title{ margin:6px 0 14px; font-size:22px; font-weight:800; }
          .tiendaCheckout-list{ display:grid; gap:10px; margin-bottom:12px; }
          .tiendaCheckout-row{
            display:grid; grid-template-columns:auto 1fr auto auto; gap:10px; align-items:center;
            border:1px solid rgba(0,0,0,.08); border-radius:10px; padding:10px 12px;
          }
          .tiendaCheckout-row.is-active{ border-color:#111; box-shadow:0 6px 16px rgba(0,0,0,.06); }
          .tiendaCheckout-radio{ display:flex; align-items:center; }
          .tiendaCheckout-info small{ opacity:.7; display:block; }
          .tiendaCheckout-qty{ display:flex; align-items:center; gap:8px; }
          .tiendaCheckout-qty button {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            border: 1.5px solid #111;
            background: #111;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.18s, color 0.18s, border-color 0.18s;
          }
          .tiendaCheckout-qty button:hover:not(:disabled) {
            background: #222;
            color: #272b40;
            border-color: #272b40;
          }
          .tiendaCheckout-qty button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #eee;
            color: #aaa;
            border-color: #ccc;
          }
          .tiendaCheckout-remove {
            width: 28px;
            height: 28px;
            border-radius: 8px;
            border: 1.5px solid #111;
            background: #111;
            color: #fff;
            font-size: 22px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.18s, color 0.18s, border-color 0.18s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tiendaCheckout-remove:hover {
            background: #222;
            color: #ffd700;
            border-color: #ffd700;
          }
          .tiendaCheckout-totals{ display:flex; gap:16px; justify-content:flex-end; margin:8px 0 12px; }
          .tiendaCheckout-method{ display:flex; align-items:center; gap:14px; margin-bottom:12px; }
          .method-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: 2px solid transparent;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f6f6f6;
          }
          .method-btn:hover {
            background: #e0e0e0;
            border-color: #111;
          }
          .method-btn.selected {
            background: #111;
            color: #fff;
            border-color: #111;
          }
          .method-btn input[type="radio"] {
            accent-color: #111;
            margin-right: 6px;
          }
          .btn{ padding:10px 12px; border-radius:12px; border:1px solid rgba(0,0,0,.12); cursor:pointer; }
          .btn-primary{ background:#111; color:#fff; border-color:#111; }
          .btn-secondary{ background:#f6f6f6; color:#111; }
        `}</style>
      </div>
    </Portal>
  )
}

/** ====== Tarjeta con estética ====== */
function PrettyPlanCard({ plan, idx, onAdd }) {
  const theme = pickTheme(idx, plan.theme)

  const isFree = (plan.amountUsd === 0 && plan.amountCop === 0)
  const big = isFree ? 'FREE' : (plan.amountUsd > 0 ? `${plan.amountUsd}` : `${Math.round(plan.amountCop/1000)}k`)
  const currency = isFree ? '' : (plan.amountUsd > 0 ? 'USD' : 'COP')

  const feats = Array.isArray(plan.features) && plan.features.length
    ? plan.features
    : (plan.description ? [plan.description] : [])

  return (
    <article
      className="pretty-card"
      style={{ '--bg': theme.bg, '--fg': theme.fg, '--accent': theme.accent, '--pill': theme.pill }}
    >
      <div className="pc-head">
        <span className="pc-line" />
        <div className="pc-stars">★{idx % 2 ? '★' : ''}</div>
      </div>

      <h3 className="pc-title">{plan.name}</h3>
      {plan.description && <p className="pc-sub">{plan.description}</p>}

      <div className="pc-price">
        <span className="pc-price-big">{big}</span>
        {!isFree && <span className="pc-currency">{currency}</span>}
      </div>

      <ul className="pc-feats">
        {feats.map((t, i) => <li key={i}>{t}</li>)}
      </ul>

      <button className="pc-cta" onClick={() => onAdd(plan.id)}>Agregar al carrito</button>

      <style jsx>{`
        .pretty-card{
          background:var(--bg);
          color:var(--fg);
          border-radius:28px;
          padding:26px 22px;
          display:flex; flex-direction:column; justify-content:flex-start;
          box-shadow:0 10px 26px rgba(0,0,0,.20);
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .pretty-card:hover{ transform:translateY(-4px); box-shadow:0 16px 36px rgba(0,0,0,.50); }

        .pc-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .pc-line{ display:block; width:42px; height:3px; background:var(--fg); opacity:.5; border-radius:2px; }
        .pc-stars{ letter-spacing:6px; opacity:.9; }

        .pc-title{ font-size:28px; line-height:1.1; margin:0 0 8px; font-weight:800; }
        .pc-sub{ margin:0 0 18px; opacity:.85; }

        .pc-price{ display:flex; align-items:flex-start; gap:6px; margin-bottom:14px; }
        .pc-price-big{ font-size:70px; line-height:.9; font-weight:700; letter-spacing:1px; }
        .pc-currency{ font-weight:700; margin-top:10px; }

        .pc-feats{ margin:8px 0 18px; padding:0 0 0 16px; display:grid; gap:8px; }
        .pc-feats li{ padding-left:6px; }

        .pc-cta{
          margin-top:auto;
          background:#fff; color:#111; border:1px solid rgba(0,0,0,.12);
          border-radius:16px; padding:14px 12px; font-weight:700;
          cursor:pointer;
        }
        /* contraste para fondos claros/oscures */
        :global(.pretty-card[style*="#e9eee9"]) .pc-cta{ background:#111; color:#fff; border-color:#111; }
      `}</style>
    </article>
  )
}

/** ====== Grid de planes (renderiza N tarjetas) ====== */
function PlansGrid({ items, onAdd }) {
  return (
    <div className="plans-grid">
      {items.map((p, i) => (
        <PrettyPlanCard key={p.id} plan={p} idx={i} onAdd={onAdd} />
      ))}

      <style jsx>{`
      .plans-grid{
        width:100%;
        display:grid;
        gap:24px;
        /* columnas responsivas: tantas como quepan */
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        align-items: stretch;
      }

      /* Si quieres forzar más columnas en pantallas grandes */
      @media (min-width: 1200px){
        .plans-grid{ grid-template-columns: repeat(3, 1fr); }
      }
      @media (min-width: 1500px){
        .plans-grid{ grid-template-columns: repeat(4, 1fr); }
      }
    `}</style>

    </div>
  )
}

/** ====== Página TIENDA (header + grid + carrito + modal) ====== */
export default function TiendaVista({ lang = 'es', setOpt = () => {} }) {
  const [items, setItems] = useState(CATALOGO)
  const [cart, setCart] = useState([]) // [{id, qty}]
  const [open, setOpen] = useState(false)

  // Cargar catálogo API (fallback)
  useEffect(() => {
    const controller = new AbortController()
    loadCatalogWithFallback(controller.signal).then(setItems)
    return () => controller.abort()
  }, [])

  // Persistencia carrito
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pokerlap_cart')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setCart(parsed.filter(x => x && x.id && x.qty > 0))
      }
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('pokerlap_cart', JSON.stringify(cart)) } catch {}
  }, [cart])

  const add = useCallback((id) => {
    setCart((prev) => {
      const i = prev.findIndex(x => x.id === id)
      if (i >= 0) { const next=[...prev]; next[i]={...next[i], qty: next[i].qty+1}; return next }
      return [...prev, { id, qty:1 }]
    })
  }, [])
  const inc    = useCallback((id) => setCart((p)=>p.map(x=>x.id===id?{...x,qty:x.qty+1}:x)), [])
  const dec    = useCallback((id) => setCart((p)=>p.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty-1)}:x)), [])
  const remove = useCallback((id) => setCart((p)=>p.filter(x=>x.id!==id)), [])
  const clear  = useCallback(() => setCart([]), [])

  // Totales
  const mapItems = useMemo(() => new Map(items.map(p => [p.id, p])), [items])
  const itemsCount = useMemo(() => cart.reduce((a,b)=>a+b.qty,0), [cart])
  const totalCop = useMemo(() => cart.reduce((a,it)=>a + (mapItems.get(it.id)?.amountCop||0)*it.qty,0), [cart,mapItems])
  const totalUsd = useMemo(() => cart.reduce((a,it)=>a + (mapItems.get(it.id)?.amountUsd||0)*it.qty,0), [cart,mapItems])

  return (
    <div className="descargas-container">
      <PageHead lang={lang} setOpt={setOpt} page={'Tienda'} />

      <div className="tabla-descargas">
        <h5 className="mb-10 mt-10">Elige el plan que más te convenga</h5>

        <PlansGrid items={items} onAdd={add} />

        {/* Barra de carrito full-width */}
        <div className="cart-bar-row">
          <div className="cart-bar">
            <div className="cart-summary">
              <span>Carrito: <b>{itemsCount}</b> {itemsCount === 1 ? 'ítem' : 'ítems'}</span>
              <span> · Total: <b>{fmtCOP(totalCop)}</b> / <b>{fmtUSD(totalUsd)}</b></span>
            </div>
            <div className="cart-actions">
              <button className="btn btn-secondary" onClick={clear} disabled={cart.length === 0}>Vaciar</button>
              <button className="btn btn-primary" onClick={() => setOpen(true)} disabled={cart.length === 0}>Ir a pagar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        cart={cart}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />

      <style jsx>{`
        .cart-bar-row{
          grid-column:1 / -1;
          width:100%;
        }
        .cart-bar{
          width:100%; box-sizing:border-box;
          position:sticky; bottom:0;
          display:flex; align-items:center; justify-content:space-between;
          gap:12px; margin-top:20px; padding:10px 12px;
          background:#fff; color:#111; border:1px solid rgba(0,0,0,.08); border-radius:12px;
          box-shadow:0 6px 16px rgba(0,0,0,.06);
        }
        .cart-summary{ font-size:14px; }
        .cart-actions{ display:flex; gap:10px; }
        .btn{ padding:10px 12px; border-radius:12px; border:1px solid rgba(0,0,0,.12); cursor:pointer; }
        .btn-primary{ background:#111; color:#fff; border-color:#111; }
        .btn-secondary{ background:#f6f6f6; color:#111; }
        .btn:disabled{ opacity:.6; cursor:not-allowed; }
      `}</style>
    </div>
  )

}
