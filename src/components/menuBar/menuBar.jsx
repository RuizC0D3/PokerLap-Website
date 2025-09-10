'use Clent'

import Image from "next/image"
import { useState, useEffect } from "react"
import { Languages, ObjVistasIdiomas, Vistas } from "../../modelos/languages"

let localpt = 0
const MenuBar = (props) => {
    const { user = { idUser: false }, setOptLogin = console.log, optLogin = false, opt = 0, setLanguageSelected = console.log, setOpt = console.log, logOut = false, lang = 'es' } = props
    const [menuOpen, setmenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    const secciones = Vistas
    const langString = ObjVistasIdiomas
    useEffect(() => {
        console.log(user, 'user');
    }, [user])
    return (
        <>

            <div className="menu" >
                {
                    menuOpen && <>
                        <div className="absMenu">
                            {secciones.map((key, i) => {
                                return (
                                    <><div onClick={(e) => { e.preventDefault(); window.location.replace(`/${secciones[i].toLowerCase().replaceAll(' ', '')}`) }} className="menu-menu-abs" key={`seccion-menu-${i}`} id={`seccion-menu-${i}`}>
                                        <Image key={`seccion-menu-${i}`} id={`seccion-menu-${i}`} src={`/multimedia/menu/${key}.png`} alt="seccionesimg" height={17} width={17} />
                                        {langString[lang][key]}
                                    </div>
                                    </>
                                )
                            })}
                            {user.idUser ? <><p className="flex-row just-center align-center">{user.email === '' ? user.usuario : user.email}<span onClick={(e) => { e.preventDefault(); logOut && logOut(); }} className="hover ml-20">Logut</span></p></> : <div className="menu-menu-login">
                                <button onClick={(e) => { e.preventDefault(); setOptLogin(!optLogin); }} > {Textos[lang].ingresar}</button>
                            </div>}
                            <div onClick={(e) => { e.preventDefault(); setmenuOpen(false) }} className="menu-menu-secciones-hijo" key={`seccion-menu-${'asas'}`} id={`seccion-menu-${'asas'}`}>
                                <h5 className="mb-10 mt-10 text-center">{Textos[lang].cerrar}</h5>
                            </div>
                        </div>
                    </>
                }
                <div className="menu-menu">
                    <div className="menu-menu-opacity">

                    </div>
                    <div className="menu-menu-container">

                        <div className="menu-menu-body">
                            <div className="menu-menu-logo" onClick={(e) => { e.preventDefault(); localpt = 0; setOpt(0) }}>
                                <Image src={'/multimedia/logo.png'} alt="logo" height={40} width={150} />
                            </div>
                            <div className="menu-menu-secciones">
                                {secciones.map((key, i) => {
                                    return (
                                        <><div onClick={(e) => { e.preventDefault(); window.location.replace(`/${secciones[i].toLowerCase().replaceAll(' ', '')}`) }} className="menu-menu-secciones-hijo" key={`seccion-menu-${i}`} id={`seccion-menu-${i}`}>
                                            <Image key={`seccion-menu-${i}`} id={`seccion-menu-${i}`} src={`/multimedia/menu/${key}.png`} alt="seccionesimg" height={17} width={17} />
                                            {langString[lang][key]}
                                        </div>
                                        </>
                                    )

                                })}
                            </div>

                            <div className="menu-menu-tools">
                                {user.idUser ?
                                    <div className="hide-xll">
                                        <>{user.img && user.img !== '' ? <div className="flex-row align-center gap-15">

                                            <img onClick={(e) => { e.preventDefault(); opt === 6 ? setOpt(localpt) : setOpt(6); }} /* onClick={(e) => { e.preventDefault(); logOut && logOut(); }}  */ className="avatar-menu bgcolorInedit-transparent hover" src={`https://img.pkti.me/user/${user.img}`} alt="" />
                                          {/*   <Image onClick={(e) => { e.preventDefault(); opt === 7 ? setOpt(localpt) : setOpt(7); }} className="bgcolorInedit-transparent hover" key={`seccion-menuascsac`} id={`seccion-menuascsac`} src={`/multimedia/shoppng.png`} alt="seccionesimg" height={35} width={35} /> */}

                                        </div> : <></>}
                                            {/* <span onClick={(e) => { e.preventDefault(); logOut && logOut(); }} className="hover ml-20">Logout</span> */}
                                        </>
                                    </div> :
                                    <div className="menu-menu-login">
                                        <button onClick={(e) => { e.preventDefault(); setOptLogin(!optLogin); }} > {Textos[lang].ingresar}</button>
                                    </div>}


                                <div className="menu-lang">

                                    <div onClick={(e) => { e.preventDefault(); setLangOpen(!langOpen) }} className="menu-menu-idioma">
                                        <Image src={`/lang/${lang}.png`} alt="idioma" className="hover abrir-lang" height={30} width={30} />

                                        {
                                            langOpen && <>
                                                <div className="lang-fixed">
                                                    {Languages.map((keyS, iS) => {
                                                        return (
                                                            <Image onClick={(e) => { e.preventDefault(); setLanguageSelected(keyS); setLangOpen(false) }} key={`img-lang-${iS}`} id={`img-lang-${iS}`} src={`/lang/${keyS}.png`} className="hover" width={30} height={30} alt="logo-star" />
                                                        )
                                                    })}
                                                </div>

                                            </>



                                        }
                                    </div>
                                    <div className="hide-xsb menu-menu-secciones-abs">
                                        <div onClick={(e) => { e.preventDefault(); setmenuOpen(true) }} className="hover abrir-menu">
                                            <Image src={'/multimedia/menu/menu.png'} alt="logo" height={40} width={40} />

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

        </>
    )
}
export default MenuBar

export const Textos = {
    es: {
        cerrar: 'Cerrar',
        ingresar: 'Ingresar'
    },
    en: {
        cerrar: 'Close',
        ingresar: 'Get Into'
    },
    ger: {
        cerrar: 'Schließen',
        ingresar: 'Geraten In'
    },
    prt: {
        cerrar: 'Fechar',
        ingresar: 'Entrar'
    },
    fr: {
        cerrar: 'Fermer',
        ingresar: 'Entrer Dans'
    }
}

