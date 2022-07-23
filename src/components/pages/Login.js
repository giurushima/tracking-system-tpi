import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../loader/Loader";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./Login.css";

import firebaseApp from "../firebase/firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = () => {
  const firestore = getFirestore(firebaseApp);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorsLogin, setErrorsLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const changeEmailRegisterHandler = (e) => {
    setEmailRegister(e.target.value);
  };

  const changePasswordRegisterHandler = (e) => {
    setPasswordRegister(e.target.value);
  };

  const changeEmailLoginHandler = (e) => {
    setEmailLogin(e.target.value);
  };
  const changePasswordLoginHandler = (e) => {
    setPasswordLogin(e.target.value);
  };

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirementsRegister = {
    name: { required: true },
    lastName: { required: true },
    emailRegister: { required: true, isEmail: true },
    passwordRegister: { required: true, minLength: 6 },
  };

  const validationRequirementsLogin = {
    emailLogin: { required: true, isEmail: true },
    passwordLogin: { required: true, minLength: 6 },
  };

  const validateLogin = (loginObject, field) => {
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

  const validateRegister = (RegisterObject, field) => {
    let errors = {};
    if (RegisterObject) {
      Object.keys(validationRequirementsRegister).forEach((key) => {
        if (
          validationRequirementsRegister[key].required &&
          !RegisterObject[key]
        ) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirementsRegister[key].isEmail &&
          !validEmail(RegisterObject[key]) &&
          (key === field || !field)
        ) {
          errors[key] = "Debe ingresar un email válido.";
        } else if (
          validationRequirementsRegister[key].minLength > 0 &&
          RegisterObject[key].length <
            validationRequirementsRegister[key].minLength
        ) {
          errors[key] =
            "El campo debe terner al menos " +
            validationRequirementsRegister[key].minLength +
            " caracteres.";
        }
      });
    }
    return errors;
  };

  const generateObjectLogin = () => {
    const Data = {
      emailLogin,
      passwordLogin,
    };
    return Data;
  };

  const generateObjectRegister = () => {
    const Data = {
      name,
      lastName,
      emailRegister,
      passwordRegister,
    };
    return Data;
  };

  async function userRegister(email, password) {
    const userInfoRegister = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfoRegister);
    console.log(userInfoRegister.user.uid);
    const docRef = doc(firestore, `employees/${userInfoRegister.user.uid}`);
    setDoc(docRef, {
      email,
      password,
      name,
      lastName,
      position: "Predeterminado",
    });
  }

  async function userLogin(emailLogin, passwordLogin) {
    const userInfoLogin = await signInWithEmailAndPassword(
      auth,
      emailLogin,
      passwordLogin
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfoLogin);
  }

  const submitHandlerRegister = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log(email, password);

    if (isRegistering) {
      userRegister(email, password, name, lastName);
    } else {
      userLogin(email, password);
    }
  };

  const submitHandlerLogin = (e) => {
    e.preventDefault();
    const emailLogin = e.target.elements.emailLogin.value;
    const passwordLogin = e.target.elements.passwordLogin.value;
    console.log(emailLogin, passwordLogin);

    if (isRegistering) {
      userRegister(emailLogin, passwordLogin);
    } else {
      userLogin(emailLogin, passwordLogin);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="primary-container">
          <div className="login">
            <h1>{isRegistering ? "Registrate" : "Inicia sesion"}</h1>
          </div>
          {isRegistering ? (
            <form onSubmit={submitHandlerRegister}>
              <div className="secondary-container">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    placeholder="Ingrese su Nombre"
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={changeNameHandler}
                    onBlur={(e) => {
                      setErrorsLogin(
                        validateRegister(generateObjectRegister())
                      );
                    }}
                  />
                  {errorsLogin?.name && (
                    <div className="red"> {errorsLogin.name} </div>
                  )}
                  <br></br>
                  <label>Apellido</label>
                  <input
                    placeholder="Ingrese su Apellido"
                    type="text"
                    id="lastName"
                    className="form-control"
                    onChange={changeLastNameHandler}
                    onBlur={(e) => {
                      setErrorsLogin(
                        validateRegister(generateObjectRegister())
                      );
                    }}
                  />
                  {errorsLogin?.lastName && (
                    <div className="red"> {errorsLogin.lastName} </div>
                  )}
                  <br></br>
                  <label>Correo electronico: </label>
                  <br />
                  <input
                    placeholder="ejemplo@gmail.com"
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={changeEmailRegisterHandler}
                    onBlur={(e) => {
                      setErrorsLogin(
                        validateRegister(generateObjectRegister())
                      );
                    }}
                  />
                  {errorsLogin?.emailRegister && (
                    <div className="red"> {errorsLogin.emailRegister} </div>
                  )}
                  <br />
                  <label>Contraseña: </label>
                  <br />
                  <input
                    placeholder="contraseña"
                    type={state ? "text" : "password"}
                    id="password"
                    className="form-control"
                    onChange={changePasswordRegisterHandler}
                    onBlur={(e) => {
                      setErrorsLogin(
                        validateRegister(generateObjectRegister())
                      );
                    }}
                  />
                  {errorsLogin?.passwordRegister && (
                    <div className="red"> {errorsLogin.passwordRegister} </div>
                  )}
                  <button className="btn-eye" onClick={toggleBtn}>
                    {state ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </button>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    {isRegistering ? "Registrate" : "Inica sesion"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={submitHandlerLogin}>
              <div className="label-email-pass">
                <label>Correo electronico: </label>
                <br />
                <input
                  placeholder="ejemplo@gmail.com"
                  type="email"
                  id="emailLogin"
                  className="form-control"
                  onChange={changeEmailLoginHandler}
                  onBlur={(e) => {
                    setErrorsLogin(validateLogin(generateObjectLogin()));
                  }}
                />
                {errorsLogin?.emailLogin && (
                  <div className="red"> {errorsLogin.emailLogin} </div>
                )}
                <br />
                <label>Contraseña: </label>
                <br />
                <input
                  placeholder="contraseña"
                  type={state ? "text" : "password"}
                  id="passwordLogin"
                  className="form-control"
                  onChange={changePasswordLoginHandler}
                  onBlur={(e) => {
                    setErrorsLogin(validateLogin(generateObjectLogin()));
                  }}
                />
                {errorsLogin?.passwordLogin && (
                  <div className="red"> {errorsLogin.passwordLogin} </div>
                )}
              </div>
              <div className="div-eye">
                <button className="btn-eye" onClick={toggleBtn}>
                  {state ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <div className="div-login">
                <button type="submit" className="btn btn-primary">
                  {isRegistering ? "Registrate" : "Inicia sesion"}
                </button>
              </div>
            </form>
          )}
          <div className="btn-login">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="btn btn-primary"
            >
              {isRegistering
                ? " ¿Ya tienes cuenta? Inica sesion"
                : "¿Ya tienes cuenta? Registrate gratis"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
