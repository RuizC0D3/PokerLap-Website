'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const metadata = {
  title: 'Resultado de compra',
  description: 'Estado del pago con Bold'
}

export default function Resultado() {
  const sp = useSearchParams()
  const status = sp.get('status') // success | cancel | null
  const plan = sp.get('plan') || '—'
  const ref = sp.get('ref') || ''

  return (
    <main style={{maxWidth:720, margin:'24px auto', padding:'0 16px'}}>
      {status === 'success' ? (
        <>
          <h1>¡Pago completado!</h1>
          <p>Plan: <b>{decodeURIComponent(plan)}</b></p>
          {ref && <p>Referencia: <code>{ref}</code></p>}
          <p><Link href="/">Volver al inicio</Link></p>
        </>
      ) : status === 'cancel' ? (
        <>
          <h1>Pago cancelado</h1>
          <p>Tu compra de <b>{decodeURIComponent(plan)}</b> fue cancelada.</p>
          <p><Link href="/tienda">Volver a la tienda</Link></p>
        </>
      ) : (
        <>
          <h1>Resultado de compra</h1>
          <p>No se recibieron parámetros de estado.</p>
          <p><Link href="/tienda">Ir a la tienda</Link></p>
        </>
      )}
    </main>
  )
}
