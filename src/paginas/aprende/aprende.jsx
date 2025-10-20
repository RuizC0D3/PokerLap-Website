// src/paginas/aprende/aprende.jsx
'use client'
import Image from "next/image"
import { useState } from "react"
import Historia from "./historia"
import Manos from "./manos"

const Aprende = (props) => {
  const { setOpt = console.log, lang = 'es' } = props
  const [aprendeVista, setaprendeVista] = useState(0)
  const elTexto = TextoHistoria

  return (
    <>
      <div style={{ marginTop: 80 }} />
      {aprendeVista === 0 && (
        <div className="aprende-container">
          <h1>Aprende Poker</h1>
          <div className="aprende-grid">
            <div onClick={(e) => { e.preventDefault(); setaprendeVista(1) }} className="aprende-card">
              <div className="aprende-icon">📖</div>
              <h3>{elTexto[lang].historia}</h3>
            </div>

            <div onClick={(e) => { e.preventDefault(); window.open('https://pokerlap.com/pdf/TDA_es.pdf', "_blank") }} className="aprende-card">
              <div className="aprende-icon">📜</div>
              <h3>{elTexto[lang].reglas}</h3>
            </div>

            <div onClick={(e) => { e.preventDefault(); setaprendeVista(2) }} className="aprende-card">
              <div className="aprende-icon">🃏</div>
              <h3>{elTexto[lang].manos}</h3>
            </div>
          </div>
        </div>
      )}
      
      {aprendeVista === 1 && <Historia lang={lang} />}
      {aprendeVista === 2 && <Manos lang={lang} />}
    </>
  )
}

export default Aprende

export const TextoHistoria = {
  es: { historia: 'Historia', reglas: 'Reglas', manos: 'Manos' },
  en: { historia: 'History', reglas: 'Rules', manos: 'Hands' },
  ger: { historia: 'Geschichte', reglas: 'Regeln', manos: 'Hände' },
  fr: { historia: `L'Histoire`, reglas: 'Des Règles', manos: 'Mains' },
  prt: { historia: 'História', reglas: 'Regras', manos: 'Mãos' }
}
