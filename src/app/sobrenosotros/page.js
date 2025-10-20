// src/app/sobrenosotros/page.js
import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import PreLanding from '../preLanding'

export const metadata = {
  title: 'PokerLAP Sobre Nosotros',
  description: 'Sobre Nosotros en PokerLAP.com',
  openGraph: {
    title: 'PokerLAP Sobre Nosotros',
    description: 'Conoce más sobre PokerLAP',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    type: 'website'
  }
}

export default function SobreNosotrosPage() {
  return (
    <>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Sobre Nosotros" />
      <PreLanding seccion={3} />
    </>
  )
}
