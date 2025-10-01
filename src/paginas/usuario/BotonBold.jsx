// src/paginas/usuario/BotonBold.jsx
'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Botón de Bold imperativo.
 * Requeridos: apiKey, orderId, amount, currency, integritySignature
 * Opcionales: description, redirectionUrl, renderMode ('embedded'|'redirect'), theme, environment
 */
export default function BotonBold({
  apiKey,
  orderId,
  amount,
  currency = 'COP',
  integritySignature,
  description,
  redirectionUrl,              // si no viene, inferimos /tienda con origin actual
  renderMode = 'embedded',
  theme = 'light-L',
  environment = 'SANDBOX',     // o 'PRODUCTION'
}) {
  const hostRef = useRef(null)

  useEffect(() => {
    if (!hostRef.current) return

    // Redirección por defecto: {origin}/tienda
    let finalRedirect = redirectionUrl
    try {
      if (!finalRedirect && typeof window !== 'undefined') {
        finalRedirect = `${window.location.origin}/tienda`
      }
    } catch {}

    // Limpia cualquier render previo (evita botones duplicados)
    hostRef.current.innerHTML = ''

    // Crea el script del botón
    const s = document.createElement('script')
    s.src = 'https://checkout.bold.co/library/boldPaymentButton.js'
    s.async = true

    // Requeridos
    s.setAttribute('data-bold-button', '')
    s.setAttribute('data-api-key', String(apiKey))
    s.setAttribute('data-order-id', String(orderId))
    s.setAttribute('data-amount', String(Math.round(Number(amount || 0))))
    s.setAttribute('data-currency', String(currency || 'COP'))
    s.setAttribute('data-integrity-signature', String(integritySignature))
    s.setAttribute('data-render', renderMode)        // 'embedded' | 'redirect'
    s.setAttribute('data-theme', theme)              // 'light-L', etc.
    s.setAttribute('data-environment', environment)  // SANDBOX | PRODUCTION

    // Opcionales
    if (description) {
      s.setAttribute('data-description', String(description).slice(0, 100))
    }

    // ⚠️ Importante: pasar SIEMPRE la redirección absoluta, incluso en localhost (http)
    if (finalRedirect) {
      s.setAttribute('data-redirection-url', finalRedirect)
    }

    // Debug útil
    console.log('[BotonBold opts]', {
      apiKey: apiKey?.slice(0, 4) + '…',
      orderId,
      amount,
      currency,
      integritySignature: integritySignature?.slice(0, 6) + '…',
      renderMode,
      theme,
      environment,
      redirectionUrl: finalRedirect,
    })

    hostRef.current.appendChild(s)

    return () => {
      try { hostRef.current && (hostRef.current.innerHTML = '') } catch {}
    }
  }, [
    apiKey,
    orderId,
    amount,
    currency,
    integritySignature,
    description,
    redirectionUrl,
    renderMode,
    theme,
    environment,
  ])

  return <div ref={hostRef} style={{ minHeight: 56 }} />
}
