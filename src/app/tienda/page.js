import '../../../estilos/styles.scss'
import PageHead from '../../components/body/pageHead'
import ShopPlans from './ShopPlans'

export const metadata = {
  title: 'PokerLAP Tienda',
  description: 'Tienda en PokerLAP.com',
  images: ['https://www.pokerlap.com/img/ficha512.jpg'],
  image: 'https://www.pokerlap.com/img/ficha512.jpg',
  openGraph: {
    title: 'PokerLAP',
    description: 'Tienda en PokerLAP.com',
    images: ['https://www.pokerlap.com/img/ficha512.jpg'],
    image: 'https://www.pokerlap.com/img/ficha512.jpg',
  }
}

export default function TiendaPage() {
  return (
    <>
      <div style={{ marginTop: 80 }} />  {/* espacio bajo el Navbar */}
      <PageHead lang="es" page="Tienda" />

      <main className="shop-wrapper">
        <ShopPlans />
      </main>
    </>
  )
}