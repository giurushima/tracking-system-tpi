import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [userLogin, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const changeUserLoginHandler = (e) => {
    setUserLogin(e.target.value);
  };
  const changePasswordLoginHandler = (e) => {
    setPasswordLogin(e.target.value);
  };

  const login = () => {
    console.log(userLogin);
    console.log(passwordLogin);
    //aca se hace el fetch a la api
  };

  return (
    <>
      <div className="primary-container">
        <div className="secondary-container">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              onChange={changeUserLoginHandler}
              className="form-control"
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              onChange={changePasswordLoginHandler}
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
