// src/app/sobrenosotros/page.js
import '../../../estilos/styles.scss'
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
      <PreLanding seccion={2} />
    </>
  )
}
