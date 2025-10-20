// src/app/torneos/page.js
import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP Torneos',
  description: 'Torneos en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Torneos',
    description: 'Encuentra y participa en torneos de poker',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function TorneosPage() {
  return (
    <>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Torneos" />
      <PreLanding seccion={2} />
    </>
  )
}
