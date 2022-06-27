import React from "react";
import { useState } from "react";
import "./Employed.css";

const Employed = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };
  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const changePositionHandler = (e) => {
    setPosition(e.target.value);
  };
  const changeUserHandler = (e) => {
    setUser(e.target.value);
  };
  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <form className="form-employee">
        <div className="inputs-employee">
          <h1>EMPLEADOS</h1>
          <label htmlFor="name">NOMBRE/S</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={changeNameHandler}
          />
          <br />
          <label htmlFor="lastName">APELLIDO/S</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={changeLastNameHandler}
          />
          <br />
          <label htmlFor="user">NOMBRE DE USUARIO</label>
          <br />
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={changePositionHandler}
          />
          <br />
          <label htmlFor="password">CONTRASEÑA</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changeUserHandler}
          />
          <br />
          <label htmlFor="position">CARGO/POSICION</label>
          <br />
          <select
            value={position}
            name="position"
            onChange={changePasswordHandler}
            defaultValue=""
          >
            <option value="">---</option>
            <option value="Empleado">Empleado</option>
            <option value="Camionero">Camionero</option>
          </select>
          <br />
          <button type="submit" className="btn btn-primary" >CARGAR USUARIO</button>
        </div>
      </form>
    </>
  );
};

export default Employed;
