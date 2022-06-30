import React, { useState } from "react";
import "./Login.css";
import { useAuthDispatch, useAuth } from '../context/AuthContextProvider';

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAuthDispatch();
  const auth = useAuth();

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
