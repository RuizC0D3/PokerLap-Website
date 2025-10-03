// src/paginas/clubs/clubIndividual.jsx
'use client'

import React from 'react'
import { ClubDetail } from './clubVista'   // <<--- export nombrado (detalle)

const ClubIndividual = (props) => {
  const {
    enClub = false,                                  // si lo usas en TorneoIndividual
    club = { ID_Club: 0, torneo: false, torneos: [] },
    clubs = [],
    torneos = [],                                     // <<--- lo necesitamos aquí
  } = props

  // Renderiza el detalle con header + acciones + torneos activos
  return (
    <div className="clubs-container">
      <div className="clubs-container-center">
        <ClubDetail club={club} torneos={torneos} />
      </div>
    </div>
  )
}

export default ClubIndividual
