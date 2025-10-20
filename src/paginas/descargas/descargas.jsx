'use client'
import PageHead from '../../components/body/pageHead'

export default function Descargas() {
  const archivos = [
    { nombre: 'Caja', url: 'https://pokerlap.s3.amazonaws.com/Caja.exe', icon: '📦' },
    { nombre: 'App Dealer', url: 'https://pokerlap.s3.amazonaws.com/app-dealer.apk', icon: '📱' },
    { nombre: 'Impresora #1', url: 'https://pokerlap.s3.amazonaws.com/impresora1.pdf', icon: '🖨️' },
    { nombre: 'Impresora #2', url: 'https://pokerlap.s3.amazonaws.com/impresora2.pdf', icon: '🖨️' },
    { nombre: 'Impresora #3', url: 'https://pokerlap.s3.amazonaws.com/impresora3.pdf', icon: '🖨️' }
  ]

  const descargar = (url, nombre) => {
    const a = document.createElement('a')
    a.href = url
    a.download = nombre
    a.target = '_blank'
    a.click()
  }

  return (
    <>
      <div style={{ marginTop: 80 }} />
      <PageHead lang="es" page="Descargas" />

      <div className="descargas-container">
        <div className="descargas-grid">
          {archivos.map((f,i) => (
            <div key={i} className="descarga-card">
              <div className="descarga-icon">{f.icon}</div>
              <h3>{f.nombre}</h3>
              <button onClick={() => descargar(f.url,f.nombre)} className="btn-descargar">
                ⬇️ Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}