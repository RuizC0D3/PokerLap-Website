"use client";

import { useEffect, useState } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

import Login from "./login";
import { FormatEnc } from "../../funciones/formatEnc";

let init = false;
const urlBack = ''

/*const defUser = { codigo: '', idUser: false, usuario: "", email: "", passwordRepeat: "", password: "", machineId: "", tipoDispositivo: "" }
const defUserP = { codigo: '', idUser: false, usuario: "elmozapate1@gmail.com", email: "elmozapate1@gmail.com", passwordRepeat: "3rrejotA", password: "3rrejotA", machineId: "ABC", tipoDispositivo: "Computadora" }*/
const LoginHome = (props) => {
    const { user = defUserP, setUser = console.log, setOptLogin = console.log, onMobils = false, pagina = { existe: false, identificador: -1 }, inPage = false, page = false, setuser = console.log, setRegister = console.log } = props;
    /*     const { contexto, setContexto } = useThemeContext();
     */
/*     const Socket = contexto.socket
 */    const [inModification, setInModification] = useState(false);
    const [serverOn, setServerOn] = useState(false);
    const [onMobil, setOnMobil] = useState(onMobils);
    const [cookieChatSolutions, setCookieChatSolutions] = useState({});
    const [cookieChatSolutionsEmpresa, setCookieChatSolutionsEmpresa] = useState({});
    const [inDoubleLog, setInDoubleLog] = useState(false);
    const [register, setRes] = useState(false);
    const [loginData, setLoginData] = useState({
        email: false,
        usuario: false,
        inCorrectUser: false,
        inCorrectPassword: false,
        sendLogin: false,
    });
    const [sendingLogin, setSendingLogin] = useState(false)

    const [fullScreen, setFullScreen] = useState(false);
    const sendLogOut = (usuario) => {
        /*  Socket &&
             Socket.emit(page ? `chatSol${page}` : 'chatSol', {
                 actionTodo: "logOut",
                 user: usuario,
             }); */
    };

    const makeTry = (usuario) => {
        const getElenemnt = async (url) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({ "q": "Login", "p": [usuario.usuario, usuario.password, user.machineId, user.tipoDispositivo] });
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
                        let resR = JSON.parse(result)
                        if (resR && resR[0] && (resR[0].ID_User)) {

                            const rawa = JSON.stringify({ "q": "Usuario_Datos", "p": [resR[0].ID_User] });
                            const myHeadersa = new Headers();
                            myHeadersa.append("Content-Type", "application/json");
                            const requestOptionsa = {
                                method: "POST",
                                headers: myHeadersa,
                                redirect: "follow",
                                body: rawa
                            };

                            fetch("https://api.pkti.me/db", requestOptionsa)
                                .then((responsea) => responsea.text())
                                .then((resulta) => {
                                    if (resulta) {
                                        if (JSON.parse(resulta) && JSON.parse(resulta)[0]) {

                                            const userDatas = JSON.parse(resulta)[0]
                                            setUser({ ...user, ...usuario, ...userDatas, email: usuario.usuario, idUser: resR[0].ID_User })
                                            let encode = JSON.stringify({ ...user, ...usuario, email: usuario.usuario, idUser: resR[0].ID_User })
                                            let userEncode = FormatEnc('enc', encode)
                                            setACookie(userEncode)
                                        }

                                    }
                                })
                                .catch((error) => console.error(error))
                            setTimeout(() => {
                                setOptLogin(false)
                            }, 3000);
                        }
                    }
                })
                .catch((error) => console.error(error))
        }
        getElenemnt();

    }
    const FrevU = (usuario) => {
        /*  Socket.emit(page ? `chatSol${page}` : 'chatSol', {
             actionTodo: "revisarUser",
             user: usuario,
         }); */
    };
    const loginCheck = (type, data) => {

    };
    const sendLogin = (usuario, registro, sesion, extras, api) => {
        if (api) {
        } else {
            setUser({
                ...user,
                ...usuario
            });
            makeTry({
                ...user,
                ...usuario
            })
        }
    };
    const destroyThecookies = () => {
        deleteCookie(page ? `chatSssssol${page}` : 'chatSol');
    };
    const logOut = (double) => {
        funFullB(fullScreen);
        setRes(false);
        destroyThecookies();
        setLoginData({
            email: false,
            usuario: false,
            inCorrectUser: false,
            inCorrectPassword: false,
            sendLogin: false,
        });
        setUser({
            ...user,
            inputStr: "",
            inputNum: Number(),
            mensaje: "Para jugar haz click en el botón",
            usuario: "",
            email: "",
            conectionId: Number(),
        });
        setCookieChatSolutions({
            created: true,
            existe: false,
        });

        !double && sendLogOut(user.usuario);
    };

    const setACookie = (value) => {
        setCookie('pokerlUser', value, {
            maxAge: 60 * 60 * 12,
            sameSite: 'strict',
            path: '/'
            /* httpOnly: true, */
            // secure: true
        })

    };
    const setACookieEmpresa = (dataIN) => {

    };
    const initCookie = () => {

    };
    const loginGoogle = (usuario) => {

    };
    const cancelLog = () => {
        /*  Socket &&
             Socket.emit(page ? `chatSol${page}` : 'chatSol', {
                 actionTodo: "oldLog",
                 user: user.usuario,
             }); */
    };
    const crearColecion = (pagina) => {

    }
    const aceptLog = () => {

    };

    return (
        <>

            <div className={!sendingLogin ? '' : 'hide'}>{<Login
                setOptLogin={setOptLogin}
                elUser={user}
                pagina={pagina}
                crearColecion={crearColecion}
                inPage={inPage}
                page={page}
                loginGoogle={loginGoogle}
                inModification={inModification}
                setInModification={setInModification}
                loginData={loginData}
                loginCheck={loginCheck}
                sendLogin={sendLogin}
            />}</div>

        </>
    );
};
export default LoginHome;
