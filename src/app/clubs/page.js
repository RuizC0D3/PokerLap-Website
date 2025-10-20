// src/app/clubs/page.js
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
    <>
      {/* Header con breadcrumb */}
      <PageHead lang="es" page="Clubs" />

      {/* Contenedor principal */}
      <main className="clubs-wrapper">
        {/* Componente que lista los clubes CON DATOS */}
        <ClubsWithData />
      </main>
    </>
  )
}
