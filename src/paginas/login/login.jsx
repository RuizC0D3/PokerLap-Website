"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
/* import { Auth0Client } from "@auth0/auth0-spa-js";
import Registrarse from "./registrarse";
import LoginConRedes from "@/auth/userData/loginConRedes";
import LineApiLogin from "@/funciones/lineApiLogin"; */
/* import LoginFacebook from "@/auth/userData/loginFacebook";
 */
const myDomain = "https://dev-67b884j2.us.auth0.com";
const myClientId = "0BC3jx3OISe4l336ZJC1ipVt4UilzdC8";/* 
const auth0 = new Auth0Client({
  domain: myDomain,
  clientId: myClientId,
}); */
let localloginabs = false
const Login = (props) => {
  const {
    inPage = false,
    setOptLogin = console.log,
    sendLogin = console.log,
    loginCheck = console.log,
    crearColecion = console.log,
    inModification = {
      usuario: true,
      password: false,
      passwordRepeat: false,
      email: false,
      emailSelected: false,
      emailReady: false,
      usuarioReady: false,
      usuarioSelected: false,
    },
    setInModification = console.log,
    loginData = {
      email: false,
      usuario: false,
      inCorrectUser: false,
      inCorrectPassword: false,
      sendLogin: false,

    }, elUser = {
      usuario: "",
      password: "",
      passwordRepeat: "",
      email: "",
    }
  } = props;
  const [load, setLoad] = useState(false);
  const [viculeAbsGoogle, setVinculeAbsGoogle] = useState({ state: false, user: false })
  const [sending, setSending] = useState(false);
  const [sendingApi, setSendingApi] = useState({ state: false, api: '' });
  const [user, setUser] = useState({
    usuario: elUser.usuario,
    password: elUser.password,
    passwordRepeat: "",
    email: elUser.email,
  });

  const [modo, setmodo] = useState("Login");
  const [infaceBook, setinfaceBook] = useState(true);
  const handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;
    if (id === "email" && verificarEmail(value)) {
      setInModification({
        ...inModification,
        emailReady: true,
      });
    } else {
      if (id === "email" && !verificarEmail(value)) {
        setInModification({
          ...inModification,
          emailReady: false,
        });
      }
    }
    if (id === "usuario" && verificarUsuario(value)) {
      setInModification({
        ...inModification,
        usuarioReady: true,
      });
    } else {
      if (id === "usuario" && !verificarUsuario(value)) {
        setInModification({
          ...inModification,
          usuarioReady: false,
        });
      }
    }
    setUser({
      ...user,
      [id]: value,
    });
  };
  const verificarEmail = (value) => {
    let res = false;
    if (
      (value || user.email).split("@").length === 2 &&
      (value || user.email).split("@")[1].split(".").length > 1 &&
      (value || user.email).split("@")[1].split(".")[
        (value || user.email).split("@")[1].split(".").length - 1
      ].length > 1
    ) {
      res = true;
    } else {
      res = false;
    }
    return res;
  };
  const verificarUsuario = (value) => {
    let res = false;

    if (loginData.email && (value || user.usuario.length) > 3) {
      res = true;
    } else {
      res = false;
    }
    return res;
  };/* 
  useEffect(() => {
    if (auth0) {
      document.getElementById("google") &&
        document
          .getElementById("google")
          .addEventListener("click", async () => {
            const popup = window.open(
              "",
              "auth0:authorize:popup",
              "left=100,top=100,width=400,height=600,resizable"
            );
            try {
              true
                ? await auth0.loginWithPopup({ popup })
                : await auth0.loginWithRedirect({
                  authorizationParams: {
                    redirect_uri: "http://localhost:3000/",
                  },
                });
            } catch (error) {
              console.log(error);
            }

            const user = await auth0.getUser();
            if (user && user.email) {
              loginGoogle(user);
            }
          });
      document.getElementById("googleRegister") &&
        document
          .getElementById("googleRegister")
          .addEventListener("click", async () => {
            const popup = window.open(
              "",
              "auth0:authorize:popup",
              "left=100,top=100,width=400,height=600,resizable"
            );
            try {
              await auth0.loginWithPopup({ popup })

            } catch (error) {
              console.log(error);
            }

            const user = await auth0.getUser();
            if (user && user.email) {
              setVinculeAbsGoogle({ ...viculeAbsGoogle, user: user })
              localloginabs = user
              Socket &&
                Socket.emit(page ? `chatSol${page}` : 'chatSol', {
                  actionTodo: page ? `registroEmpresa` : "registro",
                  api: 'google',
                  data: user,
                  user: user.email,
                  empresa: page
                });
              Socket && Socket.on(`solutionsServer${page}`, (msg) => {
                if (msg.actionTodo === "apiNotVinculed") {
                  setVinculeAbsGoogle({ ...viculeAbsGoogle, state: true })

                }
              })
            }
          });

}
  }, [modo]); */
  const makeAlgo = (algo) => {
    switch (algo) {
      case 'line':
        setSendingApi({ state: true, api: 'line' })
        break;
      case 'google':

        break;
      case 'facebook':
        setinfaceBook(true)
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    try {

      let loginm = document.getElementById('login-form')
      loginm.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.id ? e.target.id : false);
        if (e.target.id && e.target.id === 'login-form') {
          setOptLogin(false)
        }
      })
    } catch (error) {

    }
  }, [])
  return (
    <>
      {/*  {
        sendingApi.state &&
        <>
          {
            sendingApi.api === 'line' &&
            <>
              <LineApiLogin page={page} />
            </>
          }
        </>
      } */}
      <div className="fixed-top login-container">
        {load ? (
          <></>
        ) : (
          <>
            {sending ? (
              <h5 className="mb-10 mt-10" > Enviando.... </h5>
            ) : (
              <>   {
                infaceBook ? <>

                  <div className="modal-open " id="loginmd" >
                    <div className=" modal fade center show " style={{ 'display': 'block', 'padding-right': '17px' }} id="login-form" tabindex="-1" role="dialog" aria-labelledby="login-form" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered modal-xl modal-lg modal-sm" role="document">
                        <div className="modal-content cs container-px-0">
                          <div className="container ">
                            <div className="row align-items-center c-gutter-0">
                              <div className="col-lg-6 d-none d-lg-block">
                                <Image alt="logo" height={200} width={400} src={"/images/gallery/full/05.jpg"} />
                              </div>
                              <div className="col-lg-6">
                                <div className="form-wrapper p-lg-40 p-20">
                                  <form className="contact-form" osSubmit={(event) => {
                                    event.preventDefault();

                                  }}  >
                                    <div className="row c-mb-20">
                                      <div className="col-12 form-title  text-center">
                                        <h5>{elUser.idUser ? 'Revisa  tu correo' : 'Login'}</h5>
                                      </div>
                                      <>
                                        {elUser.idUser ? <div className="col-sm-12">
                                          <div className="form-group has-placeholder">
                                            <h2>Login Correcto</h2>
                                          </div>
                                        </div> :
                                          <>
                                            <div className="col-sm-12">
                                              <div className="form-group has-placeholder">
                                                <label for="name3334">Usuario<span className="required">*</span></label>
                                                <input type="text" aria-required="true" size="30" id="usuario"
                                                  value={user.usuario}
                                                  onChange={handleInput} name="name" className="form-control" placeholder="Usuario" />
                                              </div>
                                            </div>
                                            <div className="col-sm-12">
                                              <div className="form-group has-placeholder">
                                                <label for="pass12111">Contraseña<span className="required">*</span></label>
                                                <input id="password"
                                                  type="password"
                                                  value={user.password}
                                                  onChange={handleInput} className="form-control" name="pass" aria-required="true" placeholder="Contraseña" />
                                              </div>
                                            </div>
                                          </>
                                        }
                                      </>
                                      <div className="col-sm-12 mt-lg-40 mt-15 mb-0 text-center">
                                        <div className="form-group">
                                         {user.idUser ?  <input onClick={(e) => {
                                            e.preventDefault();setOptLogin(false) 
                                          }} className="btn btn-maincolor" type="submit" id="btningresar" value={ 'Cerrar' } />: <input onClick={(e) => {
                                            e.preventDefault();setSending(true);
                                           viculeAbsGoogle.state ? sendLogin(
                                              user,
                                              false, localloginabs, viculeAbsGoogle, true
                                            ) : sendLogin(
                                              user,
                                              modo === "Registro" ? true : false
                                            );
                                            setTimeout(() => {
                                              setSending(false);
                                            }, 2000);
                                          }} className="btn btn-maincolor" type="submit" id="btningresar" value={ "Ingresar"} />}
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div></div>
                </> : <>
                  <div className="container-login100">
                    <div className="wrap-login100 p-t-85 p-b-20">
                      <form className="login100-form validate-form">
                        {viculeAbsGoogle.state ? <>VINCULA TU CUENTA CON GOOGLE</> : <div className="login-hijo">
                          <span className="login100-form-title p-b-70">
                            <div className="column align-center just-center">
                              <Image className="empresa-logo" width={200} height={50} alt="logo" src={`/multimedia/logo.png`} />
                              <br />
                              <p>Login</p>

                            </div>

                          </span>
                          <span className="login100-form-avatar">
                            {/*                             <Image className="menu-logo" width={50} height={50} alt="logo" src={'/imagenes/logo.png'} />
 */}
                          </span>
                        </div>}
                        <div className="login-hijo">
                          <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate="Ingresar Usuario">
                            <input
                              id="usuario"
                              type="string"
                              value={user.usuario}
                              onChange={handleInput}
                              className="input100 "
                              name="username"
                            />
                            <span className={user.usuario.length > 3 ? 'mtm-15 focus-input100' : "focus-input100"} data-placeholder="Usuario"></span>
                          </div>
                          <div className="wrap-input100 validate-input m-b-50" data-validate="Ingresar password">
                            <input
                              className="input100"
                              id="password"
                              type="password"
                              value={user.password}
                              onChange={handleInput}
                              name="name"

                            />                        <span className={user.password.length > 3 ? 'mtm-15 focus-input100' : "focus-input100"} data-placeholder="Password"></span>
                          </div>
                          <div className="container-login100-form-btn">
                            <button id="login_send"
                              onClick={(event) => {
                                event.preventDefault();
                                setSending(true);
                                viculeAbsGoogle.state ? sendLogin(
                                  user,
                                  false, localloginabs, viculeAbsGoogle, true
                                ) : sendLogin(
                                  user,
                                  modo === "Registro" ? true : false
                                );
                                setTimeout(() => {
                                  setSending(false);
                                }, 2000);
                              }} className="login100-form-btn">
                              {viculeAbsGoogle.state ? 'VINCULAR' : 'Login'}
                            </button>
                            {viculeAbsGoogle.state && <button id="login_send"
                              onClick={(event) => {
                                event.preventDefault();
                                setVinculeAbsGoogle({ ...viculeAbsGoogle, state: false })
                              }} className="login100-form-btn">
                              Cancelar
                            </button>}
                          </div>

                        </div>
                        {!viculeAbsGoogle.state && <div className="login-hijo">
                          {/*    <LoginConRedes
                            makeAlgo={makeAlgo}
                            google
                            line
                            facebook
                          /> */}

                          <ul className="login-more p-t-190">
                            <li className="m-b-8">
                              <span className="txt1">
                                Olvidaste
                              </span>
                              <a  className="txt2">
                                <br />
                                Usuario / Password?
                              </a>
                            </li>

                          </ul>
                        </div>}

                      </form>
                    </div>
                  </div>
                  <div className="flex-column">
                    {modo === "Registro" &&
                      !inModification.usuario &&
                      !inModification.email &&
                      loginData.email &&
                      loginData.usuario &&
                      user.password.length > 3 &&
                      user.password === user.passwordRepeat && (
                        <div className="correct_data">
                          {modo !== "Login" && <>DATOS CORRECTOS</>}

                          {modo !== "Login" && (
                            <button
                              id="login_send"
                              onClick={(event) => {
                                event.preventDefault();
                                setSending(true);
                                sendLogin(user, modo === "Registro" ? true : false);
                                setTimeout(() => {
                                  setSending(false);
                                }, 5000);
                              }}
                            >
                              {modo}{" "}
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                  <div className="login_mode">
                    {modo === "Login" ? (
                      <span
                        onClick={(event) => {
                          event.preventDefault();
                          setmodo("Registro");
                        }}
                      >
                        {" "}
                        {/*                     Registrarse{" "}
*/}                  </span>
                    ) : (
                      <span
                        onClick={(event) => {
                          event.preventDefault();
                          setmodo("Login");
                        }}
                      >
                        Ya tengo cuenta{" "}
                      </span>
                    )}
                  </div>
                </>
              }</>
            )}
          </>
        )}
      </div>
    </>

  );
};
export default Login;
