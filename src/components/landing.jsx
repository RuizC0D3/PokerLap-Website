'use client'
import { useState, useEffect } from "react"
import Container from "./body/container"
import MenuBar from "./menuBar/menuBar"
import io from "socket.io-client";

import Footer from "./footer/footer"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { Languages } from "../modelos/languages";
import fetch from 'isomorphic-fetch'
import Image from "next/image"
import { FormatEnc } from "../funciones/formatEnc";
import { TorneoBlamnco, TorneoRocas } from "../paginas/torneos/torneoInteractivo/modelos/opciones";

/* const Socket = io('wss://wm.pkti.me GET /index.js HTTP/1.1')*/
let socket
let init = false

const defUser = { codigo: '', idUser: false, usuario: "", email: "", passwordRepeat: "", password: "", machineId: "ABC", tipoDispositivo: "" }
const defUserP = { codigo: '', idUser: false, usuario: "elmozapate1@gmail.com", email: "elmozapate1@gmail.com", passwordRepeat: "3rrejotA", password: "3rrejotA", machineId: "dadfCss", tipoDispositivo: "Computadora" }
let actualUser = defUser

const LandingSelect = (props) => {
    const { onMobil = { state: false }, fontion = console.log, res = 0, club = false, delact = false } = props
    const [opt, setOpt] = useState(res)
    const [torneoOpt, setTorneoOpt] = useState(false)
    const [optLogin, setOptLogin] = useState(false)
    const [user, setUser] = useState(defUser);
    const [optApp, setOptApp] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const [casinos, setCasinos] = useState([])
    const [torneos, setTorneos] = useState([])
    const [languageSelected, setLanguageSelected] = useState('es')
    const fsetLanguageSelected = (lang) => {
        setLanguageSelected(lang)
        setCookie('pokerlaplanguage', lang, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })
    }
    useEffect(() => { /* socketInitializer() */ }, [])


    const socketInitializer = async (torneo) => {
        console.log(club, res);
        if (res === 2 && !(isNaN(parseInt(club)))) {
            let socket = new WebSocket('wss://289438sd1m.execute-api.us-east-1.amazonaws.com/production');

            socket.onopen = (event) => {
                socket.send(`{"action":"ID_Torneo","valor":${parseInt(club)}}`);
            };
            socket.onmessage = (event) => {
                let dataIn = event.data
                try {
                    setTorneoOpt(JSON.parse(dataIn))
                } catch (error) {

                }
            };
        }


        /* socket.addEventListener("open", (event) => {
           console.log('1111',event);
       });
       socket.addEventListener("message", (event) => {
           console.log('222', event);
       }); */
        /* ws.send('{"action":"id","ID_Mesa":31}', (data) => {
            console.log(data);
        }) */
        /*  await fetch('wss://wm.pkti.me GET /')
  socket = io()

  socket.on('connect', () => {
      console.log('connected')
  })*/
    }
    const logOut = () => {

        deleteCookie('pokerlUser');
        window.location.reload()
    }
    const makeTry = () => {
        const getElenemntaa = async (url) => {
            const raw = JSON.stringify({ "q": "Torneo_Listar", "p": ["CO", 1000] });
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw
            };
            fetch("https://api.pkti.me/db", requestOptions)
                .then((response) => response.text())
                .then((result) => {

                    if (result) {
                        let resArray = JSON.parse(result)
                       /*  resArray.push(TorneoRocas)
                        resArray.push(TorneoBlamnco) */
                        setTorneos(resArray)
                        console.log(resArray);
                    }
                })
                .catch((error) => console.error(error))
        }

        const getElenemnt = async (url) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "q": "Club_Listar",
                "p": [
                    "CO"
                ]
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw
            };
            fetch("https://api.pkti.me/db", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    if (result) {
                        let resArray = JSON.parse(result)
                        setCasinos(resArray)
                    }
                })
                .catch((error) => console.error(error))
        }
        getElenemnt();
/*         getElenemnta();
 */        getElenemntaa()
    }
    const getLanguageAndApp = async () => {

        const tieneLang = getCookie('pokerlaplanguage')
        const boton = getCookie('pokerlapapiget')
        const userCookie = getCookie('pokerlUser')
        if (userCookie) {
            try {
                let userD = FormatEnc('des', userCookie)
                let tipoDdispo = 'Computadora'
                if (onMobil && onMobil.state && onMobil.data && onMobil.data[`_cache`]) {
                    tipoDdispo = `${onMobil.data[`_cache`].os + '-' + onMobil.data[`_cache`].phone}`
                }
                let elU = { ...JSON.parse(userD), tipoDispositivo: tipoDdispo }
                if (elU && elU.idUser) {
                    actualUser = { ...user, ...elU }
                    const raw = JSON.stringify({ "q": "Usuario_Datos", "p": [elU.idUser] });
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        redirect: "follow",
                        body: raw
                    };

                    fetch("https://api.pkti.me/db", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            if (result && JSON.parse(result) && JSON.parse(result)[0] && JSON.parse(result)[0].Correo) {
                                let tipoDdispo = 'Computadora'
                                if (onMobil && onMobil.state && onMobil.data && onMobil.data[`_cache`]) {
                                    tipoDdispo = `${onMobil.data[`_cache`].os + '-' + onMobil.data[`_cache`].phone}`
                                    actualUser.tipoDispositivo = tipoDdispo
                                    setUser({ ...actualUser, ...elU, ...JSON.parse(result)[0], tipoDispositivo: tipoDdispo })
                                } else {
                                    actualUser = { ...actualUser, ...elU, ...JSON.parse(result)[0], tipoDispositivo: tipoDdispo }
                                    setUser({ ...actualUser, ...elU, ...JSON.parse(result)[0], tipoDispositivo: tipoDdispo })
                                }

                            }
                        })
                        .catch((error) => console.error(error))
                }
            } catch (error) {

            }
        }
        let elLang = false
        if (tieneLang) {
            Languages.map((key, i) => {
                if (tieneLang === key) {
                    elLang = key
                }
            })
            elLang && setLanguageSelected(elLang)
        }
        boton && setOptApp(false)

    }

    useEffect(() => {

        /*  Socket.on(`pokerlap`, (msg) => {
                msg.actionTodo === 'casinos' && setCasinos(msg.casinos);
                msg.actionTodo === 'casinos' && setTorneos(msg.torneos); 
         })*/
        if (!init) {
            init = true


            getLanguageAndApp()

            makeTry()
        }
        /* Socket.on('conectado', (msg) => {
            console.log(msg);
        }) */
        /*         console.log(Socket.connected, 'conectado');
         */

    }, [])
    useEffect(() => {
        actualUser = user
        if (onMobil && onMobil.state && onMobil.data && onMobil.data[`_cache`]) {
            let tipoDdispo = 'Computadora'
            tipoDdispo = `${onMobil.data[`_cache`].os + '-' + onMobil.data[`_cache`].phone}`
            actualUser.tipoDispositivo = tipoDdispo
        }
    }, [user])
    useEffect(() => {
        if (onMobil && onMobil.state && onMobil.data && onMobil.data[`_cache`]) {
            let tipoDdispo = 'Computadora'

            tipoDdispo = `${onMobil.data[`_cache`].os + '-' + onMobil.data[`_cache`].phone}`
            actualUser.tipoDispositivo = tipoDdispo
            setUser(actualUser)
        }

    }, [onMobil])
    useEffect(() => {
        let objtest = {
            ip: '1.234.545.567.677',
            id: 7243556342342343
        }
        let textOb = JSON.stringify(objtest)
        let textEnc = FormatEnc('enc', textOb)
        console.log(textEnc, 'textEnc')
        socketInitializer()
    }, [])
    return (
        <>
            {onMobil.state &&
                <>
                    {
                        optApp &&
                        <>
                            <div className="get-app">
                                <button className="save" onClick={(e) => {
                                    e.preventDefault(); window.open('https://play.google.com/store/apps/details?id=com.pokerlap'); setCookie('pokerlapapiget', true, {
                                        maxAge: 60 * 60 * 12,
                                        sameSite: 'strict',
                                        path: '/'
                                        /* httpOnly: true, */
                                        // secure: true
                                    })
                                        ; setOptApp(false)
                                }} >
                                    {Textos[languageSelected].descargar}

                                </button>
                                <button className="close" onClick={(e) => {
                                    e.preventDefault(); setCookie('pokerlapapiget', true, {
                                        maxAge: 60 * 60 * 12,
                                        sameSite: 'strict',
                                        path: '/'
                                        /* httpOnly: true, */
                                        // secure: true
                                    })
                                        ; setOptApp(false)
                                }} >
                                    <Image className="hover close-btn" src={'/multimedia/icons/close.png'} width={25} height={25} alt="lgovtb" />
                                </button>
                            </div>
                        </>
                    }
                </>
            }
            {!delact && <MenuBar user={user} logOut={logOut} setOptLogin={setOptLogin} optLogin={optLogin} setLanguageSelected={fsetLanguageSelected} lang={languageSelected} setOpt={setOpt} opt={opt} />}
            <Container torneoOpt={torneoOpt} socketInitializer={socketInitializer} user={user} setUser={setUser} logout={logOut} setOptLogin={setOptLogin} optLogin={optLogin} onMobil={onMobil} delact={delact} club={club} casinos={casinos} lang={languageSelected} torneos={torneos} fullScreen={fullScreen} setFullScreen={setFullScreen} setOpt={setOpt} opt={opt} />
            <Footer lang={languageSelected} />
        </>
    )
}
export default LandingSelect

export const Textos = {
    es: {
        descargar: 'Descarga Nuestra App desde la PlayStore',
        cerrar: 'Cerrar',
    },
    en: {
        descargar: 'Descarga Nuestra App desde la PlayStore',
        cerrar: 'Close',
    },
    ger: {
        descargar: 'Descarga Nuestra App desde la PlayStore',
        cerrar: 'Schließen',
    },
    prt: {
        descargar: 'Descarga Nuestra App desde la PlayStore',
        cerrar: 'Fechar',
    },
    fr: {
        descargar: 'Descarga Nuestra App desde la PlayStore',
        cerrar: 'Fermer',
    }
}
