import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import ClubsWithData from '../../paginas/clubs/ClubsWithData'

export const metadata = {
  title: 'PokerLAP Clubs',
  description: 'Clubs en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Clubs',
    description: 'Encuentra y explora todos los clubes de poker en PokerLAP',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function ClubsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Cargando clubs...</div>}>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Clubs" />
      <main className="clubs-wrapper">
        <ClubsWithData />
      </main>
    </Suspense>
  )
}
