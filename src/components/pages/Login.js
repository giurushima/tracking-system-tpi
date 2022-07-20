import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader";

import "./Login.css";

import firebaseApp from "../firebase/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = ({}) => {
  const [userLogin_, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorsLogin, setErrorsLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeUserLoginHandler = (e) => {
    setUserLogin(e.target.value);
  };
  const changePasswordLoginHandler = (e) => {
    setPasswordLogin(e.target.value);
  };

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirementsLogin = {
    userLogin_: { required: true, isEmail: true },
    passwordLogin: { required: true, minLength: 6 },
  };

  const validate = (loginObject, field) => {
    let errors = {};
    if (loginObject) {
      Object.keys(validationRequirementsLogin).forEach((key) => {
        if (validationRequirementsLogin[key].required && !loginObject[key]) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirementsLogin[key].isEmail &&
          !validEmail(loginObject[key]) &&
          (key === field || !field)
        ) {
          errors[key] = "Debe ingresar un email válido.";
        } else if (
          validationRequirementsLogin[key].minLength > 0 &&
          loginObject[key].length < validationRequirementsLogin[key].minLength
        ) {
          errors[key] =
            "El campo debe terner al menos " +
            validationRequirementsLogin[key].minLength +
            " caracteres.";
        }
      });
    }
    return errors;
  };

  const generateObjectLogin = () => {
    const Data = {
      userLogin_,
      passwordLogin,
    };
    return Data;
  };

  async function userLogin(email, password) {
    const userInfoLogin = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfoLogin);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log(email, password);
    userLogin(email, password);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="primary-container">
          <h1>Inicia Sesión</h1>
          <form onSubmit={submitHandler}>
            <div className="secondary-container">
              <div className="form-group">
                <label>Correo electronico: </label>
                <br />
                <input
                  placeholder="ejemplo@gmail.com"
                  type="email"
                  id="email"
                  className="form-control"
                  onChange={changeUserLoginHandler}
                  onBlur={(e) => {
                    setErrorsLogin(validate(generateObjectLogin()));
                  }}
                />
                {errorsLogin?.userLogin_ && (
                  <div className="red"> {errorsLogin.userLogin_} </div>
                )}
                <br />
                <label>Contraseña: </label>
                <br />
                <input
                  placeholder="contraseña"
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={changePasswordLoginHandler}
                  onBlur={(e) => {
                    setErrorsLogin(validate(generateObjectLogin()));
                  }}
                />
                {errorsLogin?.passwordLogin && (
                  <div className="red"> {errorsLogin.passwordLogin} </div>
                )}
                <br />
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
