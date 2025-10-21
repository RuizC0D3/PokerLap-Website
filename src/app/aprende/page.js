export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import Aprende from '../../paginas/aprende/aprende'

export const metadata = {
  title: 'PokerLAP Aprende',
  description: 'Aprende poker en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Aprende',
    description: 'Historia, reglas y manos de poker',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function AprendePage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando...</div>}>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Aprende" />
      <Aprende lang="es" />
    </Suspense>
  )
}
