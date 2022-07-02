import React, { useState } from "react";
import "./Login.css";

import firebaseApp from "../firebase/firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

const Login = ({}) => {

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

  return (
    <>
      <div className="primary-container">
        <h1>Inicia Sesión</h1>
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
              <button type="submit" className="btn btn-primary">Iniciar Sesión
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
