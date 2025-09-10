import Image from "next/image"
import { useState } from "react";

const Footer = (props) => {
    const { funtion = console.log, lang = 'es' } = props
    const secciones = ['Clubs', 'Torneos', 'Sobre Nosotros']
    const [user, setUser] = useState({
        suscrito: false,
        email: ""
    });
    const makeTry = () => {

        const getElenemnt = async (url) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ "q": "Suscribir", "p": [user.email] });
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
                        console.log(result, 'login');
                        let resR = JSON.parse(result)
                        if (resR && resR[0] &&( resR[0].Res === 'OK' || resR[0].Res === 'YA')) {
                            setUser({ ...user, suscrito: true })
                        }
                    }
                })
                .catch((error) => console.error(error))
        }
        getElenemnt();

    }
    const handleInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const id = e.target.id;
        setUser({
            ...user,
            [id]: value,
        });
    };
    return (
        <>
            <div className="footer-container">
                <div className="footer-container-head">
                    <div className="footer-container-logo">
                        <Image src={'/multimedia/logo.png'} alt="logo" height={40} width={150} />
                    </div>
                    <div className="footer-container-secciones">
                        {secciones.map((key, i) => {
                            return (
                                <><div className="footer-footer-secciones-hijo" key={`seccion-footer-${i}`} id={`seccion-footer-${i}`}>
                                    {key}
                                </div>
                                    {i < secciones.length - 1 ? <><span>-</span> </> : <><span></span> </>}
                                </>
                            )
                        })}
                    </div>
                    <div className="footer-container-redes">
                        <Image src={'/multimedia/facebook.png'} className="hover" onClick={(e) => { e.preventDefault(); window.open('https://www.facebook.com/pkrLAP/?ti=as') }} alt="idioma" height={20} width={20} />
                        <Image src={'/multimedia/twiter.png'} className="hover" onClick={(e) => { e.preventDefault(); window.open('https://twitter.com/pkrLAP') }} alt="idioma" height={20} width={20} />
                        <Image src={'/multimedia/instagram.png'} className="hover" onClick={(e) => { e.preventDefault(); window.open('https://www.instagram.com/pkrlap/') }} alt="idioma" height={20} width={20} />
                    </div>
                </div>
                <div className="footer-container-botton">
                    <div className="email-div">
                        {user.suscrito ? <>
                            <div className="flex-row align-center">
                                <h2 >{user.email}</h2>
                                <p>Suscrito </p>      </div>
                        </> : <div className="flex-row">
                            <input id={'email'} className="pdl-10" value={user.email} onChange={handleInput} type="text" placeholder="Correo electrónico" />
                            <button onClick={(e) => { e.preventDefault(); makeTry() }} className="inicio-items-seccion-carrusel botones button">{Textos[lang].suscribir}</button>
                        </div>}

                    </div>
                    <div className="footer-copyright">
                        © Copyright 2024 All Rights Reserved
                        VERCEL BUILD

                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer

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


