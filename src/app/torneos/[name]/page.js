'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PreLanding from '../../preLanding'
import '../../../../estilos/styles.scss'

export default function TorneoPage() {
  const params = useParams()
  const torneoId = params.name
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Validar que el ID sea un número válido
    if (!torneoId || isNaN(parseInt(torneoId))) {
      setError('ID de torneo inválido')
      setLoading(false)
      return
    }

    setLoading(false)
  }, [torneoId])

  if (loading) {
    return (
      <main className="main">
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Cargando torneo...</h2>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="main">
        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'red' }}>
          <h2>{error}</h2>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <PreLanding seccion={2} club={torneoId} />
    </main>
  )
}
