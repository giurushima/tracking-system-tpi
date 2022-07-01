import React, { useState } from "react";
import "./Login.css";

import firebaseApp from "../firebase/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = ({}) => {
  const [isRegistering, setIsRegistering] = useState(false);

  async function userRegister(email, password) {
    const userInfoRegister = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userFirebase) => {
      return userFirebase;
    });
    console.log(userInfoRegister);
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
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log(email, password);

    if (isRegistering) {
      userRegister(email, password);
    } else {
      userLogin(email, password);
    }
  };

  return (
    <>
      <div className="primary-container">
        <h1>{isRegistering ? "Registrate" : "Inica sesion"}</h1>
        <form onSubmit={submitHandler}>
          <div className="secondary-container">
            <div className="form-group">
              <label>Correo electronico: </label>
              <br />
              <input type="email" id="email" className="form-control" />
              <br />
              <label>Contraseña: </label>
              <br />
              <input type="password" id="password" className="form-control" />
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
      </div>
    </>
  );
};

export default Login;
