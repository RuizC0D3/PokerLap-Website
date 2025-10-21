export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP',
  description: 'PokerLAP.com',
  openGraph: {
    title: 'PokerLAP',
    description: 'Todo sobre poker en PokerLAP',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function DelActPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando...</div>}>
      <PreLanding delact={true} />
    </Suspense>
  )
}
