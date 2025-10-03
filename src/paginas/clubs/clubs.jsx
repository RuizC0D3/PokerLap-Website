// src/paginas/clubs/club.jsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import PageHead from '../../components/body/pageHead'
import ClubCard from './clubVista' // default export

const PAGE_SIZE = 18  // más grandes + más por página

export default function Clubs({
  club = false,          // NO lo usamos aquí (detalle va en /clubs/[club])
  casinos = [],          // viene de tu API
  torneos = [],          // viene de tu API
  setOpt = () => {},
  lang = 'es',
}) {
  const [q, setQ] = useState('')
  const [city, setCity] = useState('ALL')
  const [page, setPage] = useState(0)

  // ciudades únicas
  const cities = useMemo(() => {
    const s = new Set()
    casinos.forEach(c => { if (c?.Ciudad) s.add(String(c.Ciudad)) })
    return ['ALL', ...Array.from(s).sort()]
  }, [casinos])

  // filtro
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return casinos.filter(c => {
      if (city !== 'ALL' && String(c?.Ciudad) !== String(city)) return false
      if (!term) return true
      const name = (c?.Nombre || '').toLowerCase()
      const dir  = (c?.Direccion || '').toLowerCase()
      return name.includes(term) || dir.includes(term)
    })
  }, [casinos, q, city])

  // paginado
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = useMemo(() => {
    const start = page * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  useEffect(() => { setPage(0) }, [q, city])

  return (
    <div className="clubs-container">
      <PageHead lang={lang} page="Clubs" setOpt={setOpt} />

      {/* filtros */}
      <div className="filters">
        <input
          className="search"
          placeholder="Buscar club o dirección…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((c) => (
            <option key={c} value={c}>{c === 'ALL' ? 'Todas las ciudades' : c}</option>
          ))}
        </select>
      </div>

      {/* grid (cards más grandes) */}
      <div className="grid">
        {pageItems.map((c) => (
          <ClubCard key={c.ID_Club || c.id} club={c} torneos={torneos} />
        ))}
      </div>

      {/* paginación */}
      <div className="pager">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            className={`pbtn ${i === page ? 'is-active' : ''}`}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <style jsx>{`
        .filters{
          margin:14px 0; display:flex; gap:12px; flex-wrap:wrap;
        }
        .search{
          flex:1 1 560px; min-width:280px;
          height:46px; padding:0 14px; border-radius:14px;
          border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06);
          color:inherit; outline:none;
        }
        .search::placeholder{ opacity:.7; }

        .city{
          height:46px; padding:0 14px; border-radius:14px; outline:none; cursor:pointer;
          border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06); color:inherit;
        }

        .grid{
          display:grid; gap:18px;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          align-items: stretch;
        }

        .pager{
          display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:20px 0 6px;
        }
        .pbtn{
          height:36px; min-width:36px; padding:0 11px; border-radius:10px; cursor:pointer;
          border:1px solid rgba(0,0,0,.12); background:#fff; color:#111; font-weight:800;
          transition:.14s transform,.14s box-shadow;
        }
        .pbtn:hover{ transform:translateY(-1px); box-shadow:0 12px 28px rgba(0,0,0,.12); }
        .pbtn.is-active{ background:#111; color:#fff; border-color:#111; }
      `}</style>
    </div>
  )
}
