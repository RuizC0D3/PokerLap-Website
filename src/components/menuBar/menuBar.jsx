// src/components/menuBar/menuBar.jsx
'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Languages, ObjVistasIdiomas, Vistas } from '../../modelos/languages'

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faDownload, faStore, faUser, faUsers,
  faBookOpen, faSpade, faClover, faNewspaper, faCircleQuestion, faEnvelope, faTrophy, faRankingStar, faBars, faGlobe, faCircle
} from '@fortawesome/free-solid-svg-icons'

// normalizador Sobre Nosotros / aprender
const normalize = (s = '') =>
  s.toLowerCase()
   .normalize('NFD').replace(/\p{Diacritic}/gu, '')
   .replace(/[\s_-]+/g, '')
   .trim()

// mapa usando claves NORMALIZADAS
const ICONS = {
  inicio: faHouse,
  descargas: faDownload,
  tienda: faStore,
  usuario: faUser,
  aprender: faBookOpen,
  aprende:  faBookOpen, 
  clubs:    faClover,
  sobrenosotros: faUsers,
  noticias: faNewspaper,
  ayuda:    faCircleQuestion,
  contacto: faEnvelope,
  torneos:  faTrophy,
  ranking:  faRankingStar,
}

const getIconFor = (key) => ICONS[normalize(key)] || faCircle


let localpt = 0

const MenuBar = (props) => {
  const {
    user = { idUser: false },
    setOptLogin = console.log,
    optLogin = false,
    opt = 0,
    setLanguageSelected = console.log,
    setOpt = console.log,
    logOut = false,
    lang = 'es'
  } = props

  const [menuOpen, setmenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const secciones = Vistas
  const langString = ObjVistasIdiomas

  useEffect(() => {
    // console.log(user, 'user');
  }, [user])

  const goTo = (label) => {
    const slug = label.toLowerCase().replaceAll(' ', '')
    window.location.replace(`/${slug}`)
  }

  return (
    <>
      <div className="menu">
        {/* ----- Drawer / Menú flotante ----- */}
        {menuOpen && (
          <div className="absMenu">
            {secciones.map((key, i) => (
              <div
                onClick={(e) => { e.preventDefault(); goTo(secciones[i]) }}
                className="menu-menu-abs"
                key={`seccion-menu-abs-${i}`}
                id={`seccion-menu-abs-${i}`}
              >
                <FontAwesomeIcon icon={getIconFor(key)} className="menu-icon" />
                {langString[lang][key]}
              </div>
            ))}

            {user.idUser ? (
              <p className="flex-row just-center align-center">
                {user.email === '' ? user.usuario : user.email}
                <span
                  onClick={(e) => { e.preventDefault(); logOut && logOut() }}
                  className="hover ml-20"
                >
                  Logout
                </span>
              </p>
            ) : (
              <div className="menu-menu-login">
                <button onClick={(e) => { e.preventDefault(); setOptLogin(!optLogin) }}>
                  {Textos[lang].ingresar}
                </button>
              </div>
            )}

            <div
              onClick={(e) => { e.preventDefault(); setmenuOpen(false) }}
              className="menu-menu-secciones-hijo"
              key={`seccion-menu-close`}
              id={`seccion-menu-close`}
            >
              <h5 className="mb-10 mt-10 text-center">{Textos[lang].cerrar}</h5>
            </div>
          </div>
        )}

        {/* ----- Barra superior ----- */}
        <div className="menu-menu">
          <div className="menu-menu-opacity" />
          <div className="menu-menu-container">
            <div className="menu-menu-body">
              {/* Logo */}
              <div
                className="menu-menu-logo"
                onClick={(e) => { e.preventDefault(); localpt = 0; setOpt(0) }}
              >
                <Image src={'/multimedia/logo.png'} alt="logo" height={40} width={150} />
              </div>

              {/* Secciones con ícono FA */}
              <div className="menu-menu-secciones">
                {secciones.map((key, i) => (
                  <div
                    onClick={(e) => { e.preventDefault(); goTo(secciones[i]) }}
                    className="menu-menu-secciones-hijo"
                    key={`seccion-menu-${i}`}
                    id={`seccion-menu-${i}`}
                  >
                    <FontAwesomeIcon icon={getIconFor(key)} className="menu-icon" />
                    {langString[lang][key]}
                  </div>
                ))}
              </div>

              {/* Herramientas (usuario + idioma + hamburguesa) */}
              <div className="menu-menu-tools">
                {user.idUser ? (
                  <div className="hide-xll">
                    <>
                      {user.img && user.img !== '' ? (
                        <div className="flex-row align-center gap-15">
                          <img
                            onClick={(e) => { e.preventDefault(); opt === 6 ? setOpt(localpt) : setOpt(6) }}
                            className="avatar-menu bgcolorInedit-transparent hover"
                            src={`https://img.pkti.me/user/${user.img}`}
                            alt="avatar"
                          />
                        </div>
                      ) : null}
                    </>
                  </div>
                ) : (
                  <div className="menu-menu-login">
                    <button onClick={(e) => { e.preventDefault(); setOptLogin(!optLogin) }}>
                      {Textos[lang].ingresar}
                    </button>
                  </div>
                )}

                <div className="menu-lang">
                  <div
                    onClick={(e) => { e.preventDefault(); setLangOpen(!langOpen) }}
                    className="menu-menu-idioma"
                    title="Idioma"
                  >
                    <FontAwesomeIcon icon={faGlobe} className="menu-icon" />
                    {langOpen && (
                      <div className="lang-fixed">
                        {Languages.map((keyS, iS) => (
                          <button
                            key={`lang-btn-${iS}`}
                            className={`lang-btn${lang === keyS ? ' selected' : ''}`}
                            aria-selected={lang === keyS}
                            onClick={(e) => {
                              e.preventDefault();
                              setLanguageSelected(keyS);
                              setLangOpen(false);
                            }}
                          >
                            {keyS.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hamburguesa / menú colapsado */}
                  <div className="hide-xsb menu-menu-secciones-abs">
                    <div
                      onClick={(e) => { e.preventDefault(); setmenuOpen(true) }}
                      className="hover abrir-menu"
                      title="Abrir menú"
                    >
                      <FontAwesomeIcon icon={faBars} className="menu-icon" />
                    </div>
                  </div>
                </div>
              </div>
              {/* /menu-menu-tools */}
            </div>
            {/* /menu-menu-body */}
          </div>
        </div>
      </div>

      {/* Ajustes mínimos para que el ícono quede del tamaño del PNG anterior */}
      <style jsx>{`
        .menu-icon {
          width: 17px;
          height: 17px;
          margin-right: 8px;
        }
        .lang-fixed {
          padding: 16px 12px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 120px;
          align-items: center;
          border: 1px solid #eee;
        }
        .lang-btn {
          width: 100%;
          text-align: center;
          font-size: 15px;
          font-weight: 500;
          border-radius: 8px;
          border: 1px solid #111;
          background: #fff;
          color: #111;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          padding: 6px 0;
          margin: 0;
        }
        .lang-btn:hover, .lang-btn:focus {
          background: #111;
          color: #fff;
        }
        .lang-btn[aria-selected="true"], .lang-btn.selected {
          background: #111;
          color: #fff;
        }
      `}</style>
    </>
  )
}

export default MenuBar

export const Textos = {
  es: { cerrar: 'Cerrar', ingresar: 'Ingresar' },
  en: { cerrar: 'Close', ingresar: 'Get Into' },
  ger:{ cerrar: 'Schließen', ingresar: 'Geraten In' },
  prt:{ cerrar: 'Fechar', ingresar: 'Entrar' },
  fr: { cerrar: 'Fermer', ingresar: 'Entrer Dans' }
}
