import { Suspense } from 'react'
import '../../../estilos/styles.scss'
import Redirect from './redirect'


export default function Home() {
  return (
    <>
      <main className="fondopoker column hgt-100 size-100 align-center just-center">
        <Redirect />
      </main>
      <Suspense fallback={<div>Cargando...</div>}>
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p>Página /d</p>
        </div>
      </Suspense>
    </>
  )
}
