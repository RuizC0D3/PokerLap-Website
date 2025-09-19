'use client'
import { useEffect, useState } from "react"
import Container from "./body/container"
import MenuBar from "./menuBar/menuBar"
import Footer from "./footer/footer"
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import { Languages } from "../modelos/languages"
import Image from "next/image"
import { FormatEnc } from "../funciones/formatEnc"

// Si pones NEXT_PUBLIC_DEBUG=1 en .env.local verás logs
const DEBUG = process.env.NEXT_PUBLIC_DEBUG === '1'

let init = false

const defUser = { codigo: '', idUser: false, usuario: "", email: "", passwordRepeat: "", password: "", machineId: "ABC", tipoDispositivo: "" }
let actualUser = defUser

const LandingSelect = (props) => {
  const { onMobil = { state: false }, res = 0, club = false, delact = false } = props

  const [opt, setOpt] = useState(res)
  const [torneoOpt, setTorneoOpt] = useState(false)
  const [optLogin, setOptLogin] = useState(false)
  const [user, setUser] = useState(defUser)
  const [optApp, setOptApp] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const [casinos, setCasinos] = useState([])
  const [torneos, setTorneos] = useState([])
  const [languageSelected, setLanguageSelected] = useState('es')

  // Detectar ruta en cliente para no ejecutar landing cuando estemos en /tienda
  const [routeReady, setRouteReady] = useState(false)
  const [isTienda, setIsTienda] = useState(false)
  useEffect(() => {
    // se evalúa solo en cliente
    const path = window.location.pathname
    setIsTienda(path === '/tienda' || path.startsWith('/tienda'))
    setRouteReady(true)
  }, [])

  const fsetLanguageSelected = (lang) => {
    setLanguageSelected(lang)
    setCookie('pokerlaplanguage', lang, {
      maxAge: 60 * 60 * 12,
      sameSite: 'strict',
      path: '/',
    })
  }

  const logOut = () => {
    deleteCookie('pokerlUser')
    window.location.reload()
  }

  // --------- Llamados remotos de la landing (NO se ejecutan en /tienda) ---------
  const fetchTorneos = async () => {
    try {
      const res = await fetch("https://api.pkti.me/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: "Torneo_Listar", p: ["CO", 1000] })
      })
      const txt = await res.text()
      if (!txt) return
      const arr = JSON.parse(txt)
      setTorneos(arr)
      if (DEBUG) console.log('[Landing] Torneos', arr)
    } catch (e) {
      if (DEBUG) console.warn('[Landing] Torneos error', e)
    }
  }

  const fetchCasinos = async () => {
    try {
      const res = await fetch("https://api.pkti.me/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: "Club_Listar", p: ["CO"] })
      })
      const txt = await res.text()
      if (!txt) return
      const arr = JSON.parse(txt)
      setCasinos(arr)
      if (DEBUG) console.log('[Landing] Casinos', arr)
    } catch (e) {
      if (DEBUG) console.warn('[Landing] Casinos error', e)
    }
  }

  const makeTry = () => {
    fetchCasinos()
    fetchTorneos()
  }

  // --------- Usuario / idioma ----------
  const getLanguageAndApp = async () => {
    const tieneLang = getCookie('pokerlaplanguage')
    const boton = getCookie('pokerlapapiget')
    const userCookie = getCookie('pokerlUser')

    if (userCookie) {
      try {
        const decoded = FormatEnc('des', userCookie)
        let tipoDdispo = 'Computadora'
        if (onMobil?.state && onMobil?.data?._cache) {
          tipoDdispo = `${onMobil.data._cache.os}-${onMobil.data._cache.phone}`
        }
        const elU = { ...JSON.parse(decoded), tipoDispositivo: tipoDdispo }
        if (elU?.idUser) {
          actualUser = { ...user, ...elU }
          // pedir datos actualizados
          try {
            const res = await fetch("https://api.pkti.me/db", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ q: "Usuario_Datos", p: [elU.idUser] })
            })
            const txt = await res.text()
            const data = txt ? JSON.parse(txt) : []
            const perfil = data?.[0] || {}
            if (onMobil?.state && onMobil?.data?._cache) {
              tipoDdispo = `${onMobil.data._cache.os}-${onMobil.data._cache.phone}`
            }
            actualUser = { ...actualUser, ...elU, ...perfil, tipoDispositivo: tipoDdispo }
            setUser(actualUser)
          } catch {}
        }
      } catch {}
    }

    if (tieneLang && Languages.includes(tieneLang)) {
      setLanguageSelected(tieneLang)
    }
    boton && setOptApp(false)
  }

  // --------- Inicialización (evitar ejecutar en /tienda) ----------
  useEffect(() => {
    if (!routeReady) return
    if (init) return
    init = true

    getLanguageAndApp()

    // Solo la landing hace sus llamadas cuando **no** estamos en /tienda
    if (!isTienda) {
      makeTry()
    }
  }, [routeReady, isTienda]) // <- importante

  // Mantener actualUser consistente con los cambios de usuario / dispositivo
  useEffect(() => {
    actualUser = user
    if (onMobil?.state && onMobil?.data?._cache) {
      actualUser.tipoDispositivo = `${onMobil.data._cache.os}-${onMobil.data._cache.phone}`
    }
  }, [user, onMobil])

  // Generar y guardar textEnc para otros módulos (sin log y sin molestar /tienda)
  useEffect(() => {
    if (!routeReady) return
    try {
      const objtest = { ip: '1.234.545.567.677', id: 7243556342342343 }
      const textEnc = FormatEnc('enc', JSON.stringify(objtest))
      // Guardar para que /tienda pueda leerlo si lo necesita
      localStorage.setItem('pkti_textEnc', textEnc)
      setCookie('pkti_textEnc', textEnc, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' })
      if (DEBUG) console.log('[Landing] textEnc generado y guardado')
    } catch (e) {
      if (DEBUG) console.warn('[Landing] no se pudo generar textEnc', e)
    }
    // Si tienes sockets propios de la landing y NO quieres abrirlos en /tienda, guárdalos:
    // if (!isTienda) socketInitializer()
  }, [routeReady, isTienda])

  return (
    <>
      {onMobil.state &&
        <>
          {optApp &&
            <div className="get-app">
              <button
                className="save"
                onClick={(e) => {
                  e.preventDefault()
                  window.open('https://play.google.com/store/apps/details?id=com.pokerlap')
                  setCookie('pokerlapapiget', true, {
                    maxAge: 60 * 60 * 12,
                    sameSite: 'strict',
                    path: '/'
                  })
                  setOptApp(false)
                }}>
                {Textos[languageSelected].descargar}
              </button>
              <button
                className="close"
                onClick={(e) => {
                  e.preventDefault()
                  setCookie('pokerlapapiget', true, {
                    maxAge: 60 * 60 * 12,
                    sameSite: 'strict',
                    path: '/'
                  })
                  setOptApp(false)
                }}>
                <Image className="hover close-btn" src={'/multimedia/icons/close.png'} width={25} height={25} alt="close" />
              </button>
            </div>
          }
        </>
      }

      {!delact && (
        <MenuBar
          user={user}
          logOut={logOut}
          setOptLogin={setOptLogin}
          optLogin={optLogin}
          setLanguageSelected={fsetLanguageSelected}
          lang={languageSelected}
          setOpt={setOpt}
          opt={opt}
        />
      )}

      <Container
        torneoOpt={torneoOpt}
        // socketInitializer={socketInitializer} // si lo usas, actívalo solo cuando proceda
        user={user}
        setUser={setUser}
        logout={logOut}
        setOptLogin={setOptLogin}
        optLogin={optLogin}
        onMobil={onMobil}
        delact={delact}
        club={club}
        casinos={casinos}
        lang={languageSelected}
        torneos={torneos}
        fullScreen={fullScreen}
        setFullScreen={setFullScreen}
        setOpt={setOpt}
        opt={opt}
      />

      <Footer lang={languageSelected} />
    </>
  )
}

export default LandingSelect

export const Textos = {
  es: { descargar: 'Descarga Nuestra App desde la PlayStore', cerrar: 'Cerrar' },
  en: { descargar: 'Descarga Nuestra App desde la PlayStore', cerrar: 'Close' },
  ger: { descargar: 'Descarga Nuestra App desde la PlayStore', cerrar: 'Schließen' },
  prt: { descargar: 'Descarga Nuestra App desde la PlayStore', cerrar: 'Fechar' },
  fr: { descargar: 'Descarga Nuestra App desde la PlayStore', cerrar: 'Fermer' },
}
