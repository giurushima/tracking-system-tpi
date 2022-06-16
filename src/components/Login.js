import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    //aca se hace el fetch a la api
  };
  return (
    <>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              className="form-control"
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <br />
            <button className="btn btn-primary" onClick={login()}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
