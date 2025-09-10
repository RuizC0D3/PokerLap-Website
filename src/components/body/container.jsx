'use client'

import { useState } from "react"
import Aprende from "../../paginas/aprende/aprende"
import Clubs from "../../paginas/clubs/clubs"
import Descargas from "../../paginas/descargas/descargas"
import Inicio from "../../paginas/inicio/inicio"
import SobreNosotros from "../../paginas/sobreNosotros/sobreNosotros"
import Torneos from "../../paginas/torneos/torneos"
import LoginHome from "../../paginas/login/home"
import UserInfoVista from "../../paginas/usuario/userInfo"
import TiendaVista from "../../paginas/usuario/tienda"
import PLanesUsuario from "../../paginas/usuario/planes"

let init = false
let userr = {}
const Container = (props) => {
    const { torneoOpt = false, user, socketInitializer = console.log, setUser = console.log, setOptLogin = console.log, optLogin = false, lang = 'es', club = false, torneos = [], srcVideo = '', casinos = [], onMobil = false, logout = console.log, delact = false, setInGift = console.log, socket = false, setOpt = console.log, opt = 0 } = props
    return (
        <div className="landing-container">
            {
                (opt === 0 || delact) && <>
                    <Inicio delact={delact} lang={lang} setOpt={setOpt} />
                </>
            }
            {
                opt === 1 && <>
                    <Clubs lang={lang} club={club} torneos={torneos} casinos={casinos} setOpt={setOpt} />
                </>
            }
            {
                opt === 2 && <>
                    <Torneos torneoOpt={torneoOpt} socketInitializer={socketInitializer} lang={lang} club={club} torneos={torneos} clubs={casinos} setOpt={setOpt} />
                </>
            }
            {
                opt === 3 && <>
                    <SobreNosotros lang={lang} setOpt={setOpt} />
                </>
            }
            {
                opt === 4 && <>
                    <Aprende lang={lang} setOpt={setOpt} />
                </>
            }
            {
                opt === 5 && <>
                    <Descargas lang={lang} setOpt={setOpt} />
                </>
            }
            {
                opt === 6 && <>
                    <TiendaVista setOpt={setOpt} lang={languageSelected} />
                </>
            }
            {
                opt === 6 && <> 
                    <UserInfoVista logout={logout} />
                </>
            }
            {
                opt === 8 && <> <PLanesUsuario />
                </>
            }

            {
                optLogin && <>
                    <LoginHome user={user} setUser={setUser} setOptLogin={setOptLogin} onMobils={onMobil} lang={lang} setOpt={setOpt} />
                </>
            }
        </div>
    )
}
export default Container

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

