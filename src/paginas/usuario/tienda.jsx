'use client'
import '../../../estilos/styles.scss'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState, Suspense } from 'react'
import { createPortal } from 'react-dom'
import BotonBold from './BotonBold'


// ============= CONFIG =============
const API_TIENDA_URL = '/api/tienda'


// ============= HELPERS =============
const fmtCOP = (n) =>
  (n ?? 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const fmtUSD = (n) =>
  (n ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })


function findArrayDeep(obj, seen = new Set()) {
  if (!obj || typeof obj !== 'object') return null
  if (seen.has(obj)) return null
  seen.add(obj)
  if (Array.isArray(obj) && obj.length && typeof obj[0] === 'object') return obj
  const keys = [
    'planes','productos','items','data','result','results','records','rows','list',
    'payload','response','content'
  ]
  for (const k of keys) {
    const v = obj[k]
    if (Array.isArray(v) && v.length && typeof v[0] === 'object') return v
    if (v && typeof v === 'object') {
      if (Array.isArray(v.items) && v.items.length) return v.items
      if (Array.isArray(v.data) && v.data.length) return v.data
    }
  }
  for (const v of Object.values(obj)) {
    const found = findArrayDeep(v, seen)
    if (found) return found
  }
  return null
}


function toPlan(x, idx) {
  return {
    id: String(x.id ?? x.ID ?? x.codigo ?? `p-${idx}`),
    name: x.name ?? x.nombre ?? x.titulo ?? 'Plan',
    description: x.description ?? x.descripcion ?? x.detalle ?? '',
    amountCop: Number(x.amountCop ?? x.cop ?? x.precioCop ?? x.precio_cop ?? 0),
    amountUsd: Number(x.amountUsd ?? x.usd ?? x.precioUsd ?? x.precio_usd ?? 0),
    features: Array.isArray(x.features) ? x.features : undefined,
  }
}


async function fetchPlanesPorClub({ i, signal, textEncFromUrl }) {
  const payload = textEncFromUrl ? { textEnc: textEncFromUrl } : {}
 
  if (i != null && i !== '' && !Number.isNaN(Number(i))) {
    payload.i = Number(i)
  } else {
    payload.i = 0
  }
 
  let res
  try {
    res = await fetch(API_TIENDA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal,
    })
  } catch (e) {
    if (e?.name === 'AbortError') return []
    console.error('[Tienda] fetch error:', e)
    return []
  }
 
  const raw = await res.clone().text()
  if (!res.ok) {
    console.error('[Tienda] status', res.status, raw)
    return []
  }
 
  let data
  try { data = JSON.parse(raw) } catch { data = raw }
  let arr = Array.isArray(data) ? data : (findArrayDeep(data) || [])
 
  if (Array.isArray(arr) && arr.length && typeof arr[0] === 'object' && 'Res' in arr[0]) {
    const collected = []
    for (const row of arr) {
      const s = row?.Res
      if (typeof s === 'string' && s.trim().length) {
        try {
          const inner = JSON.parse(s)
          if (Array.isArray(inner)) collected.push(...inner)
        } catch (e) {
          console.warn('[Tienda] No pude parsear row.Res:', e)
        }
      }
    }
    if (collected.length) arr = collected
  }
 
  return arr.map(toPlan)
}


// ============= THEMES (PokerLap originales) =============
const THEMES = {
  navy:  { bg: '#111111', fg: '#ffffff', accent: '#cc272b', pill: '#ffffff' },
  yellow:{ bg: '#cc272b', fg: '#ffffff', accent: '#ffffff', pill: '#ffffff' },
  teal:  { bg: '#444444', fg: '#ffffff', accent: '#ffffff', pill: '#ffffff' },
  soft:  { bg: '#d9d9d9', fg: '#111111', accent: '#111111', pill: '#111111' },
}
const THEME_ORDER = ['navy','yellow','teal','soft']
const pickTheme = (idx, theme) => THEMES[theme] || THEMES[THEME_ORDER[idx % THEME_ORDER.length]]


// ============= PORTAL MODAL =============
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
  }, [])
  if (!node) return null
  return createPortal(children, node)
}


// ============= MODAL CHECKOUT =============
function CheckoutModal({ open, onClose, items, cart, onInc, onDec, onRemove }) {
  const [method, setMethod] = useState('bold')
  const [selected, setSelected] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [signature, setSignature] = useState(null)
  const [prepError, setPrepError] = useState(null)
  const [prepLoading, setPrepLoading] = useState(false)
 
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
 
  // ✅ BOLD: Genera firma en USD (sin conversión COP)
  useEffect(() => {
    async function prepBold() {
      setPrepError(null)
      setSignature(null)
      setOrderId(null)
     
      if (!open || method !== 'bold' || !selected) return
     
      const plan = items.find(p => p.id === selected)
      if (!plan) return
     
      const amountUsd = Number(plan.amountUsd || 0)
      if (!amountUsd || amountUsd <= 0) {
        setPrepError('Este plan no tiene precio USD válido.')
        return
      }
     
      const oid = `plan-${String(plan.id).replace(/[^A-Za-z0-9_-]/g,'')}-${Date.now()}`
      setOrderId(oid)
      setPrepLoading(true)
     
      try {
        const r = await fetch('/api/bold/hash', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: oid, amount: amountUsd, currency: 'USD' })
        })
        const d = await r.json()
       
        if (!r.ok || !d?.signature) {
          setPrepError(d?.error || 'No se pudo generar la firma.')
          return
        }
       
        setSignature(d.signature)
        console.log('✅ Firma Bold generada (USD):', amountUsd)
      } catch (e) {
        console.error('❌ Error Bold:', e)
        setPrepError(e?.message || 'Error al generar la firma.')
      } finally {
        setPrepLoading(false)
      }
    }
   
    prepBold()
  }, [open, method, selected, items])
 
  if (!open) return null
 
  const apiKeyPublic = process.env.NEXT_PUBLIC_BOLD_IDENTITY_KEY
  const selectedPlan = items.find(p => p.id === selected)
  const amountForBold = Number(selectedPlan?.amountUsd || 0)
  const webUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000')
  const redirectionUrl = `${webUrl}/tienda/resultado`
 
  return (
    <Portal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
         
          <h3 className="modal-title">Resumen del carrito</h3>
         
          {lines.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="cart-items">
                {lines.map((it) => (
                  <div key={it.id} className="cart-item">
                    <input
                      type="radio"
                      name="toPay"
                      checked={selected === it.id}
                      onChange={() => {
                        setSelected(it.id)
                        setSignature(null)
                        setOrderId(null)  
                        setPrepError(null)
                      }}
                    />
                    <div className="cart-item-info">
                      <strong>{it.plan.name}</strong>
                      <div className="cart-item-prices">
                        <span>{fmtCOP(it.plan.amountCop)}</span>
                        <span className="price-separator">·</span>
                        <span>{fmtUSD(it.plan.amountUsd)}</span>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => onDec(it.id)}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => onInc(it.id)}>+</button>
                      <button onClick={() => onRemove(it.id)} className="btn-remove">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
             
              <div className="cart-total">
                <div className="total-row">
                  <span>Total (COP):</span>
                  <strong>{fmtCOP(totalCop)}</strong>
                </div>
                <div className="total-row">
                  <span>Total (USD):</span>
                  <strong>{fmtUSD(totalUsd)}</strong>
                </div>
              </div>
             
              <div className="payment-methods">
                <p className="payment-title">Método de pago:</p>
                <label className="payment-option">
                  <input type="radio" checked={method === 'bold'} onChange={() => setMethod('bold')} />
                  <span>💳 Bold (PSE, Nequi, TC)</span>
                </label>
                <label className="payment-option">
                  <input type="radio" checked={method === 'coinbase'} onChange={() => setMethod('coinbase')} />
                  <span>🪙 Coinbase (Cripto)</span>
                </label>
              </div>
             
              <div className="payment-button-container">
                {method === 'bold' && (
                  <div className="bold-button-wrapper">
                    {prepLoading ? (
                      <p className="preparing">Preparando pago Bold...</p>
                    ) : apiKeyPublic && orderId && signature && amountForBold > 0 ? (
                      <BotonBold
                        apiKey={apiKeyPublic}
                        orderId={orderId}
                        amount={amountForBold}
                        currency="USD"
                        description={selectedPlan?.description || selectedPlan?.name || 'Compra'}
                        redirectionUrl={redirectionUrl}
                        integritySignature={signature}
                        renderMode="embedded"
                        theme="light-L"
                        environment="PRODUCTION"
                      />
                    ) : (
                      <p className="preparing">Preparando...</p>
                    )}
                    {prepError && <p className="error-msg">⚠️ {prepError}</p>}
                  </div>
                )}
               
                {method === 'coinbase' && (
                  <div className="coinbase-button-wrapper">
                    {selectedPlan && selected ? (
                      <>
                        <button
                          className="btn-pagar-coinbase"
                          onClick={async () => {
                            console.log('🔥 CLICK COINBASE - planId:', selected, 'amountUsd:', selectedPlan?.amountUsd)
                            try {
                              setPrepError(null)
                              const res = await fetch('/api/coinbase-charge', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ 
                                  planId: selected,
                                  amountUsd: Number(selectedPlan?.amountUsd || 0)  // ✅ DESDE CARRITO
                                })
                              })
                              console.log('📡 Response status:', res.status)
                              const data = await res.json()
                              console.log('📡 Response data:', data)
                              if (!res.ok) {
                                setPrepError(data.error || `Error ${res.status}`)
                                return
                              }
                              if (data.url) {
                                console.log('🚀 Redirecting to Coinbase:', data.url)
                                window.location.href = data.url
                              } else {
                                setPrepError('No se recibió URL de pago')
                              }
                            } catch (err) {
                              console.error('💥 Coinbase error:', err)
                              setPrepError(err?.message || 'Error procesando el pago')
                            }
                          }}
                        >
                          Pagar {fmtUSD(Number(selectedPlan?.amountUsd || 0) * 1.06)} (6% fee)
                        </button>
                      </>
                    ) : (
                      <p className="preparing">Selecciona un plan...</p>
                    )}
                    {prepError && <p className="error-msg">⚠️ {prepError}</p>}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Portal>
  )
}


// ============= PLAN CARD =============
function PrettyPlanCard({ plan, idx, onAdd }) {
  const theme = pickTheme(idx, plan.theme)
  const isFree = (plan.amountUsd === 0 && plan.amountCop === 0)
  const big = isFree
    ? 'FREE'
    : (plan.amountUsd > 0 ? `${plan.amountUsd}` : `${Math.round(plan.amountCop / 1000)}`)
  const currency = isFree ? '' : (plan.amountUsd > 0 ? 'USD' : '')
  const feats = Array.isArray(plan.features) && plan.features.length
    ? plan.features
    : (plan.description ? [plan.description] : [])
 
  return (
    <div className="plan-card" style={{ background: theme.bg, color: theme.fg }}>
      <div className="plan-badge">★{idx % 2 ? '★' : ''}</div>
      <h3>{plan.name}</h3>
      {plan.description && <p className="plan-desc">{plan.description}</p>}
      <div className="plan-price">
        <span className="price-big">{big}</span>
        {!isFree && <span className="price-currency">{currency}</span>}
      </div>
      <ul className="plan-features">
        {feats.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
      <button className="btn-add-cart" onClick={() => onAdd(plan.id)}>
        Agregar al carrito
      </button>
    </div>
  )
}


function PlansGrid({ items, onAdd }) {
  return (
    <div className="plans-grid">
      {items.map((p, i) => (
        <PrettyPlanCard key={p.id} plan={p} idx={i} onAdd={onAdd} />
      ))}
    </div>
  )
}


// ============= COMPONENTE PRINCIPAL =============
function TiendaVistaContent({ lang = 'es', setOpt = () => {} }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [txAlert, setTxAlert] = useState(null)
  const [items, setItems] = useState([])
 
  const iParam = searchParams?.get('i') ?? process.env.NEXT_PUBLIC_TIENDA_CLUB_ID ?? null
  const textEncFromUrl = searchParams?.get('textEnc') ?? undefined
  const [loadingApi, setLoadingApi] = useState(false)
  const [errorApi, setErrorApi] = useState(null)
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
 
  // Lee resultado de Bold
  useEffect(() => {
    const status = (searchParams?.get('bold-tx-status') || '').toLowerCase()
    const orderId = searchParams?.get('bold-order-id') || null
    if (!status) return
    setTxAlert({ status, orderId })
    const sp = new URLSearchParams(Array.from(searchParams.entries()))
    sp.delete('bold-tx-status')
    sp.delete('bold-order-id')
    const qs = sp.toString()
    router.replace(qs ? `?${qs}` : '/tienda', { scroll: false })
  }, [searchParams, router])
 
  // Carga desde BD
  useEffect(() => {
    setLoadingApi(true)
    setErrorApi(null)
   
    const ctrl = new AbortController()
   
    fetchPlanesPorClub({ i: iParam, signal: ctrl.signal, textEncFromUrl })
      .then((arr) => {
        if (arr && arr.length > 0) {
          console.log('[Tienda] ✅ Planes cargados de API:', arr.length)
          setItems(arr)
          setErrorApi(null)
        } else {
          console.warn('[Tienda] ⚠️ API retornó vacío')
          setItems([])
          setErrorApi('No hay planes disponibles.')
        }
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') {
          console.error('[Tienda] ❌ Error en API:', err)
          setItems([])
          setErrorApi('Error cargando planes.')
        }
      })
      .finally(() => setLoadingApi(false))
   
    return () => ctrl.abort()
  }, [iParam, textEncFromUrl])
 
  // Carrito persistido
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pokerlap_cart')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setCart(parsed.filter(x => x && x.id && x.qty > 0))
      }
    } catch {}
  }, [])
 
  // Limpia ítems huérfanos
  useEffect(() => {
    setCart((prev) => prev.filter(c => items.some(p => p.id === c.id)))
  }, [items])
 
  useEffect(() => {
    try { localStorage.setItem('pokerlap_cart', JSON.stringify(cart)) } catch {}
  }, [cart])
 
  // Helpers carrito
  const add = useCallback((id) =>
    setCart((p) => {
      const i = p.findIndex(x => x.id === id)
      if (i >= 0) {
        const n = [...p]
        n[i] = { ...n[i], qty: n[i].qty + 1 }
        return n
      }
      return [...p, { id, qty: 1 }]
    }), []
  )
 
  const inc = useCallback((id) =>
    setCart((p) => p.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x)), []
  )
 
  const dec = useCallback((id) =>
    setCart((p) => p.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)), []
  )
 
  const remove = useCallback((id) =>
    setCart((p) => p.filter(x => x.id != id)), []
  )
 
  const mapItems = useMemo(() => new Map(items.map(p => [p.id, p])), [items])
  const itemsCount = useMemo(() => cart.reduce((a,b)=>a+b.qty,0), [cart])
  const totalCop = useMemo(() => cart.reduce((a,it)=>a + (mapItems.get(it.id)?.amountCop||0)*it.qty,0), [cart,mapItems])
  const totalUsd = useMemo(() => cart.reduce((a,it)=>a + (mapItems.get(it.id)?.amountUsd||0)*it.qty,0), [cart,mapItems])
 
  return (
    <div className="tienda-container">
      {txAlert && (
        <div
          className={`tienda-alert ${
            txAlert.status === 'approved' ? 'ok' :
            txAlert.status === 'rejected' ? 'bad' : 'warn'
          }`}
          role="status"
        >
          {txAlert.status === 'approved' && (
            <>
              ✅ Pago aprobado. Pedido <strong>{txAlert.orderId}</strong>.
              <button onClick={() => setTxAlert(null)}>✕</button>
            </>
          )}
          {txAlert.status === 'rejected' && (
            <>
              ❌ El pago fue rechazado (Pedido <strong>{txAlert.orderId}</strong>).
              <button onClick={() => setTxAlert(null)}>✕</button>
            </>
          )}
          {txAlert.status !== 'approved' && txAlert.status !== 'rejected' && (
            <>
              ⏳ Pago en proceso (Pedido <strong>{txAlert.orderId}</strong>).
              <button onClick={() => setTxAlert(null)}>✕</button>
            </>
          )}
        </div>
      )}
     
      <h1>Elige el plan que más te convenga</h1>
     
      {loadingApi && <p className="loading">Cargando planes…</p>}
      {errorApi && <p className="error">{errorApi}</p>}
     
      <PlansGrid items={items} onAdd={add} />
     
      {itemsCount > 0 && (
        <div className="cart-floating" onClick={() => setOpen(true)}>
          <div className="cart-badge">{itemsCount}</div>
          <div className="cart-icon">🛒</div>
          <div className="cart-info">
            <span className="cart-label">Carrito</span>
            <span className="cart-total">{fmtUSD(totalUsd)}</span>
          </div>
        </div>
      )}
     
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        cart={cart}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
      />
    </div>
  )
}


export default function TiendaVista(props) {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          Cargando tienda...
        </div>
      }
    >
      <TiendaVistaContent {...props} />
    </Suspense>
  )
}