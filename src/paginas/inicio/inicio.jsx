'use client'

import Image from "next/image"
import { useState } from "react"

const Inicio = (props) => {
    const { lang = 'es', delact = false } = props
    const [carrulselVista, setcarrulselVista] = useState(0)
    const [user, setUser] = useState({ desvivido: false, email: '', emailCode: '', codigo: false, code: '', wait: false, wtime: 0, id: '' });

    const desivivirse = (usuario) => {
        const getElenemnt = async (url) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ "c": user.email });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw
            };
            fetch("https://codigo.pkti.me/cuenta", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    if (result) {
                        console.log(result);

                        try {
                            let rpa = result.replaceAll('"', '')
                            let rpar = rpa.split(',')

                            if (rpar[0] == 'OK') {
                                setUser({ ...user, codigo: true, id: rpar[1] })
                            }
                            if (rpar[0] == "WT") {
                                console.log('ssss');
                                setUser({ ...user, wait: true, wtime: rpar[1] })
                            }
                        } catch (error) {

                        }

                    }
                })
                .catch((error) => console.error(error))
        }
        const getElenemnta = async (url) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ "q": "Eliminar_WEB", "p": [user.id, user.emailCode] });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: raw
            };
            fetch("https://api.pkti.me/db", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result);
                    if (result) {
                        try {
                            if (JSON.parse(result)[0].Res === 'OK') {
                                setUser({ ...user, desvivido: true })
                            }
                        } catch (error) {

                        }
                    }
                })
                .catch((error) => console.error(error))
        }
        console.log(user);
        !usuario && getElenemnt()
        usuario && getElenemnta()
    };

    const handleInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const id = e.target.id;
        setUser({ ...user, [id]: value })
    }
    return (
        <>
            <div className="inicio-container">
                <div className="inicio-backimage">
                </div>
                <div className="inicio-items">
                    <div className="inicio-items-seccion-carrusel">
                        {!delact && carrulselVista === 0 && <div className="inicio-items-seccion-carrusel-father">
                            <div className="inicio-items-seccion-carrusel-item">
                                <Image src={'/multimedia/landing/logogrande.png'} alt="logoxl" height={225} width={225} />
                            </div>
                            <div className="texto">
                                <h5 className="mb-10 mt-10" >POKERLAP</h5>
                                <p>{Textos[lang].textoInicio}</p>
                            </div>
                        </div>}
                        {!delact && carrulselVista === 1 && <></>}

                        {delact ? <>
                            <div className="column gap-20">
                                <h2>                                We are very sorry that you no longer
                                    <br /> want to continue accompanying us.
                                </h2>
                                {user.desvivido ? <>
                                    <h5 className="mb-10 mt-10" >Correct delete</h5>
                                </> : <div className="div">
                                    <form onSubmit={(e) => { e.preventDefault() }} className="desvivir">
                                        <h3>           {user.codigo ? <>We send a code to your email</> : <>Please enter your email associated  with the PokerLAP account</>}                </h3>
                                        {user.codigo ? <div className="email-div" >
                                            <div className="flex-row gap-0  align-center just-center ">
                                                <input value={user.emailCode} onChange={handleInput} className="pdl-10 font-size-20 " id="emailCode" type="text" placeholder="email Code" />
                                                <button type="submit" onClick={(e) => { e.preventDefault(); desivivirse(true) }} className="ppp pd-0 mrt-0 mt-0 inicio-items-seccion-carrusel botones button">SEND CODE</button>
                                            </div>
                                        </div> : user.wait ? <div className="email-div" >
                                            <div className="flex-row gap-0  align-center just-center ">
                                                Por favor espere {user.wtime} minutos para un nuevo codigo.
                                            </div>
                                        </div> : <><div className="email-div"> <div className="flex-row gap-0  align-center just-center ">
                                            <input value={user.email} onChange={handleInput} className="pdl-10 font-size-20 size-300" id="email" type="text" placeholder="email" />
                                            <button type="submit" onClick={(e) => { e.preventDefault(); desivivirse() }} className="ppp pd-0 mrt-0 mt-0 inicio-items-seccion-carrusel botones button">SEND EMAIL</button>
                                        </div></div></>}
                                    </form>
                                </div>}

                            </div>
                        </> : <div className="botones">
                            <button className="botones-descargar">{Textos[lang].descargar}</button>
                            <button className=" botones-aprende">{Textos[lang].aprende}</button>

                        </div>}
                    </div>
                </div>
            </div>
        </>

    )
}
export default Inicio

export const Textos = {
    es: {
        descargar: 'Descargar App',
        aprende: 'Aprende Más',
        textoInicio: 'El mejor sistema para sus torneos de Poker.'
    },
    en: {
        descargar: 'Download App',
        aprende: 'Learn More',
        textoInicio: 'The best system for your Poker tournaments.'
    },
    ger: {
        descargar: 'Lode App Herunter',
        aprende: 'Erfahren Sie Miehr',
        textoInicio: 'Das beste System für Ihre Pokerturniere.'
    },
    prt: {
        descargar: 'Baixar Aplicativo',
        aprende: 'Saber Mais',
        textoInicio: 'O melhor sistema para seus torneios de Poker. '
    },
    fr: {
        descargar: `Télécharger l'appli`,
        aprende: 'Apprendre Encore Plus',
        textoInicio: 'Le meilleur système pour vos tournois de Poker.'
    }
}

