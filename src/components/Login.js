import React, { useState } from "react";
import "./Login.css";
import { useAuthDispatch, useAuth } from '../context/AuthContextProvider';

const Login = () => {
<<<<<<< HEAD
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAuthDispatch();
  const auth = useAuth();
=======
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
>>>>>>> 5e0c1ea4b194c59342b0839ce6f1aa2e9ae595df

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
            {   auth.waitingLogin &&
                    <p>Logueando por favor espere ....</p>
            }
            {   !auth.waitingLogin &&
                <button
                    onClick={() => {
                        dispatch.login(user, password);
                    }}
                className="btn btn-primary"
                >Iniciar Sesión</button>
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
