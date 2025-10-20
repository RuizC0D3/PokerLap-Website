// src/app/aprende/page.js
import '../../../estilos/styles.scss'
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
  return <Aprende lang="es" />
}
