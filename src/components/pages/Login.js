import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../loader/Loader";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
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
  const [userLogin_, setUserLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorsLogin, setErrorsLogin] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

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
    setDoc(docRef, { email, password, name, lastName, position: "Predeterminado" });
  }

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
            <h1>{isRegistering ? "Registrate" : "Inica sesion"}</h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className="secondary-container">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  placeholder="Ingrese su Nombre"
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={changeNameHandler}
                ></input>
                <br></br>
                <label>Apellido</label>
                <input
                  placeholder="Ingrese su Apellido"
                  type="text"
                  id="lastName"
                  className="form-control"
                  onChange={changeLastNameHandler}
                ></input>
                <br></br>
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
                  type={state ? "text" : "password"}
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
                  {isRegistering ? "Registrate" : "Inica sesion"}
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="btn btn-primary"
          >
            {isRegistering
              ? " ¿Ya tienes cuenta? Inica sesion"
              : "¿Ya tienes cuenta? Registrate gratis"}
          </button>
          <button className="btn-eye" onClick={toggleBtn}>
            {state ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
