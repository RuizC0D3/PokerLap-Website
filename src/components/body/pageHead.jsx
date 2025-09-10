'use client'

import { ObjVistasIdiomas } from "../../modelos/languages"
import Inicio from "../../paginas/inicio/inicio"

let init = false
let userr = {}
const PageHead = (props) => {
    const { lang = '', club = false, subPage = false, setInPage = console.log, setOpt = console.log, page = ''
    } = props

    return (
        <div className="page-head-container">
            <h5 className="mb-10 mt-10" >{subPage ? subPage :ObjVistasIdiomas[lang][page] }</h5>

            <div className="flex-row">
                <span className="page-back" onClick={(e) => { e.preventDefault(); club ? window.location.replace('./') : setOpt(0) }}>
                    {ObjVistasIdiomas[lang].Inicio}
                </span>
                {` > `}
                <span onClick={(e) => { e.preventDefault(); subPage ? club ? window.location.replace('.') : setInPage() : console.log }} className={subPage ? "page-back" : "page-item"}> {ObjVistasIdiomas[lang][page]}
                </span>
                {subPage ? ` > ` : ''
                }
                {subPage ? <span className="page-item">{subPage}
                </span> : <></>}
            </div>

        </div >
    )
}
export default PageHead


export const Textos = {
    es: {
        suscribir: 'Suscribir'
    },
    en: {
        suscribir: ''
    },
    ger: {
        suscribir: ''
    },
    prt: {
        suscribir: ''
    },
    fr: {
        suscribir: ''
    }
}
