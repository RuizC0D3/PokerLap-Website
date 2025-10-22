import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP Inicio',
  description: 'Inicio en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Inicio',
    description: 'Todo sobre poker en PokerLAP',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function InicioPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando...</div>}>
      <PreLanding seccion={0} />
    </Suspense>
  )
}
