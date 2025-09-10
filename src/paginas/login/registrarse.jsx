import LoginConRedes from "@/auth/userData/loginConRedes";
import Image from "next/image";

const Registrarse = (props) => {
  const { user, handleInput, inModification, loginCheck, loginData, setInModification, verificarUsuario} = props;
  return (
    <>
      <div className="flex-column">
        <div className="input_div">
          <p> Email </p>

          {!inModification.emailSelected && !loginData.email ? (
            <>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleInput}
              />
              {inModification.emailReady && (
                <>
                  <p
                    onClick={(event) => {
                      event.preventDefault();
                      loginCheck("revisarEmail", user.email);
                    }}
                  >
                    Seleccionar
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              {!inModification.emailReady ? (
                <>
                  {!inModification.email && !loginData.email && (
                    <>
                      <Image
                        src={"/imagenes/svg_error.png"}
                        width={"30"}
                        height={"30"}
                        alt="ok"
                      />
                      Email ya registrado
                      <p>
                        {" "}
                        <p
                          onClick={(event) => {
                            event.preventDefault();
                            setInModification({
                              ...inModification,
                              emailReady: false,
                              emailSelected: false,
                            });
                          }}
                          className="hover"
                        >
                          {" "}
                          {"Modificar"}{" "}
                        </p>
                      </p>
                    </>
                  )}

                  {!inModification.email && loginData.email && (
                    <div className="space_b">
                      <p>{user.email}</p>
                      <div className="flex">
                        <Image
                          src={"/imagenes/svg_ok.png"}
                          width={"30"}
                          height={"30"}
                          alt="ok"
                        />
                        <p>
                          {" "}
                          <p
                            onClick={(event) => {
                              event.preventDefault();
                              setInModification({
                                ...inModification,
                                email: !inModification.email,
                                emailReady: true,
                              });
                            }}
                            className="hover"
                          >
                            {" "}
                            {!inModification.email
                              ? "Modificar"
                              : "Aceptar"}{" "}
                          </p>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {!inModification.email ? (
                    <>
                      {" "}
                      <p>
                        {" "}
                        {user.email}{" "}
                        <p
                          onClick={(event) => {
                            event.preventDefault();
                            setInModification({
                              ...inModification,
                              email: !inModification.email,
                            });
                          }}
                          className="hover"
                        >
                          {" "}
                          {!inModification.email ? "Modificar" : "Aceptar"}{" "}
                        </p>
                      </p>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={handleInput}
                      />{" "}
                      <p>
                        {" "}
                        <p
                          onClick={(event) => {
                            event.preventDefault();
                            setInModification({
                              ...inModification,
                              email: !inModification.email,
                              emailReady: false,
                            });
                            loginCheck("revisarEmail", user.email);
                          }}
                          className="hover"
                        >
                          {" "}
                          {!inModification.email ? "Modificar" : "Aceptar"}{" "}
                        </p>
                      </p>{" "}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <>
          {!inModification.email && loginData.email && (
            <>
              <div className="input_div">
                <p> Usuario </p>
                {!inModification.usuarioSelected ? (
                  <>
                    {" "}
                    <input
                      id="usuario"
                      type="text"
                      value={user.usuario}
                      onChange={handleInput}
                    />
                    {verificarUsuario() && (
                      <>
                        <p
                          onClick={(event) => {
                            event.preventDefault();
                            loginCheck("revisarUsuario", user.usuario);
                          }}
                        >
                          Seleccionar
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!inModification.usuarioReady ? (
                      <>
                        {!inModification.usuario && !loginData.usuario && (
                          <>
                            <Image
                              src={"/imagenes/svg_error.png"}
                              width={"30"}
                              height={"30"}
                              alt="ok"
                            />
                            usuario ya registrado
                            <p>
                              {" "}
                              <p
                                onClick={(event) => {
                                  event.preventDefault();
                                  setInModification({
                                    ...inModification,
                                    usuarioReady: false,
                                    usuarioSelected: false,
                                  });
                                }}
                                className="hover"
                              >
                                {" "}
                                {"Modificar"}{" "}
                              </p>
                            </p>
                          </>
                        )}

                        {!inModification.usuario && loginData.usuario && (
                          <div className="space_b">
                            <p>{user.usuario}</p>
                            <div className="flex">
                              <Image
                                src={"/imagenes/svg_ok.png"}
                                width={"30"}
                                height={"30"}
                                alt="ok"
                              />
                              <p>
                                {" "}
                                <p
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setInModification({
                                      ...inModification,
                                      usuario: !inModification.usuario,
                                      usuarioReady: true,
                                    });
                                  }}
                                  className="hover"
                                >
                                  {" "}
                                  {!inModification.usuario
                                    ? "Modificar"
                                    : "Aceptar"}{" "}
                                </p>
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {!inModification.usuarioReady ? (
                          <>
                            {" "}
                            <input
                              id="usuario"
                              type="text"
                              value={user.usuario}
                              onChange={handleInput}
                            />{" "}
                            <p>
                              {" "}
                              {!inModification.usuario ? "" : user.usuario}{" "}
                              <p
                                onClick={(event) => {
                                  event.preventDefault();
                                  setInModification({
                                    ...inModification,
                                    usuario: !inModification.usuario,
                                  });
                                }}
                                className="hover"
                              >
                                {" "}
                                {!inModification.usuario
                                  ? "Modificar"
                                  : "Aceptar"}{" "}
                              </p>
                            </p>{" "}
                          </>
                        ) : (
                          <>
                            <input
                              id="usuario"
                              type="text"
                              value={user.usuario}
                              onChange={handleInput}
                            />
                            <p>
                              <p
                                onClick={(event) => {
                                  event.preventDefault();
                                  loginCheck("revisarUsuario", user.usuario);
                                }}
                                className="hover"
                              >
                                {" "}
                                {!inModification.usuario
                                  ? "Modificar"
                                  : "Aceptar"}{" "}
                              </p>
                            </p>{" "}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}{" "}
        </>

        <div className="register_password">
          <div className="div_container">
            {loginData.email &&
              loginData.usuario &&
              !inModification.usuario &&
              !inModification.email && (
                <>
                  <div className="input_div">
                    <p> Password </p>{" "}
                    <input
                      id="password"
                      type="password"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="input_div">
                    <p> Verificar Password </p>{" "}
                    <input
                      id="passwordRepeat"
                      type="password"
                      value={user.passwordRepeat}
                      onChange={handleInput}
                    />
                  </div>
                </>
              )}
          </div>

          {user.password.length > 3 &&
            user.password.length > 3 &&
            user.password === user.passwordRepeat && (
              <Image
                src={"/imagenes/svg_ok.png"}
                width={"30"}
                height={"30"}
                alt="ok"
              />
            )}
        </div>
        <LoginConRedes center google />
      </div>
    </>
  );
};
export default Registrarse;
