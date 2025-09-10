import '../../../estilos/styles.scss'
import PreLanding from '../preLanding'
export const metadata = {
  title: 'PokerLAP',
  description: 'Aprende enPokerLAP',
  images: [`https://www.pokerlap.com/img/ficha512.jpg`],
  image: `https://www.pokerlap.com/img/ficha512.jpg`,
  openGraph: {
    title: 'PokerLAP',
    description: 'Aprende enPokerLAP',
    images: [`https://www.pokerlap.com/img/ficha512.jpg`],
    image: `https://www.pokerlap.com/img/ficha512.jpg`,
  }
}
export default function Home() {

  return (
    <main className="main">
      <PreLanding   seccion={4} />
    </main>
  )
}
