import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'
export const metadata = {
  title: 'PokerLAP Descargas',
  description: 'Descargas enPokerLAP.com',
  images: [`https://www.pokerlap.com/img/ficha512.jpg`],
  image: `https://www.pokerlap.com/img/ficha512.jpg`,
  openGraph: {
    title: 'PokerLAP',
    description: 'Descargas enPokerLAP.com',
    images: [`https://www.pokerlap.com/img/ficha512.jpg`],
    image: `https://www.pokerlap.com/img/ficha512.jpg`,
  }
}
export default function Home() {

  return (
    <main className="main">
      <PreLanding   seccion={5} />
    </main>
  )
}