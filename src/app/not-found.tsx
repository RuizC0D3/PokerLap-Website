export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import '../../estilos/styles.scss'

export default function NotFound() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div style={{ marginTop: 80, padding: '60px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#111827' }}>404 - Página no encontrada</h1>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>La página que buscas no existe</p>
        <a href="/" style={{ padding: '12px 32px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '16px' }}>
          Volver al inicio
        </a>
      </div>
    </Suspense>
  )
}
