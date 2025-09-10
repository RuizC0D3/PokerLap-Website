'use client'

import Image from "next/image"
import { useState } from "react"
import PageHead from "../../components/body/pageHead"
import Historia from "./historia"
import Manos from "./manos"

const Aprende = (props) => {
    const { setOpt = console.log, lang = 'es' } = props
    const [aprendeVista, setaprendeVista] = useState(0)
    const elTexto = TextoHistoria
    return (
        <>
            <div className="aprende-container">
                <PageHead  lang= { lang }setInPage={() => { setaprendeVista(0) }} page={'Aprende'} subPage={aprendeVista === 1 ? 'Historia' : aprendeVista === 2 ? 'Manos' : false} setOpt={setOpt} />
                {aprendeVista === 0 && <div className="cards">
                    <div onClick={(e) => { e.preventDefault(); setaprendeVista(1) }} className="card-historia">
                        <h5 className="mb-10 mt-10" >{elTexto[lang].historia}</h5>
                        <Image src={`/multimedia/historia/historia.png`} className="hover seccion-1-1" width={150} height={150} alt="logo-0" />

                    </div>
                    <div onClick={(e) => { e.preventDefault(); window.open('https://pokerlap.com/pdf/TDA_es.pdf', "self") }} className="card-historia">
                        <h5 className="mb-10 mt-10" >{elTexto[lang].reglas}</h5>
                        <Image src={`/multimedia/historia/reglas.png`} className="hover seccion-1-1" width={150} height={150} alt="logo-0" />

                    </div>
                    <div onClick={(e) => { e.preventDefault(); setaprendeVista(2) }} className="card-historia">
                        <h5 className="mb-10 mt-10" >{elTexto[lang].manos}</h5>
                        <Image src={`/multimedia/historia/manos.png`} className="hover seccion-1-1" width={150} height={150} alt="logo-0" />

                    </div>
                </div>}
                {aprendeVista === 1 && <Historia />}
                {aprendeVista === 2 && <Manos />}

            </div>
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









