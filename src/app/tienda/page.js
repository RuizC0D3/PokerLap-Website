import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import TiendaVista from '../../paginas/usuario/tienda'

export const metadata = {
  title: 'PokerLAP Tienda',
  description: 'Tienda en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Tienda',
    description: 'Planes y suscripciones en PokerLAP',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando tienda...</div>}>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Tienda" />
      <main className="shop-wrapper">
        <TiendaVista lang="es" />
      </main>
    </Suspense>
  )
}
