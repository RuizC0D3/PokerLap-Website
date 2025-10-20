// src/paginas/clubs/ClubsWithData.jsx
'use client'
import { useEffect, useState } from 'react'
import Clubs from './clubs'

export default function ClubsWithData() {
  const [casinos, setCasinos] = useState([])
  const [torneos, setTorneos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch clubs
        const clubsRes = await fetch('https://api.pkti.me/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: 'Club_Listar', p: ['CO'] })
        })
        const clubsData = await clubsRes.json()
        setCasinos(clubsData || [])

        // Fetch torneos
        const torneosRes = await fetch('https://api.pkti.me/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: 'Torneo_Listar', p: ['CO', 1000] })
        })
        const torneosData = await torneosRes.json()
        setTorneos(torneosData || [])
      } catch (error) {
        console.error('[ClubsWithData] Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Cargando clubes...</p>
      </div>
    )
  }

  return <Clubs casinos={casinos} torneos={torneos} lang="es" />
}
