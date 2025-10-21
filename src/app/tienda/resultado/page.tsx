export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Resultado de compra',
  description: 'Estado del pago con Bold',
}

type Props = { searchParams: { status?: string; ref?: string } }

export default function ResultadoPage({ searchParams }: Props) {
  const status = searchParams.status || 'unknown'
  const ref = searchParams.ref
  return (
    <>
      <main style={{ maxWidth: 720, margin: '24px auto', padding: '0 16px' }}>
        {status === 'success' ? (
          <>
            <h1>¡Pago completado!</h1>
            <p>Referencia: <strong>{ref || '—'}</strong></p>
            <p>Te enviamos un correo con los detalles de tu compra.</p>
            <p><Link href="/tienda">Volver a la tienda</Link></p>
          </>
        ) : status === 'cancel' ? (
          <>
            <h1>Pago cancelado</h1>
            <p>Tu transacción fue cancelada. Puedes intentarlo nuevamente.</p>
            <p><Link href="/tienda">Volver a la tienda</Link></p>
          </>
        ) : status === 'failure' ? (
          <>
            <h1>No pudimos procesar tu pago</h1>
            <p>Por favor intenta nuevamente o contáctanos con la ref: <strong>{ref || '—'}</strong></p>
            <p><Link href="/tienda">Volver a la tienda</Link></p>
          </>
        ) : (
          <>
            <h1>Estado desconocido</h1>
            <p>No pudimos determinar el resultado del pago.</p>
            <p><Link href="/tienda">Volver a la tienda</Link></p>
          </>
        )}
      </main>
      <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando resultado...</div>}>
      <div style={{ marginTop: 80, padding: 20, textAlign: 'center' }}>
        <h1>Página de Resultado</h1>
        <p>Contenido próximamente</p>
      </div>
    </Suspense>
    </>
  )
}