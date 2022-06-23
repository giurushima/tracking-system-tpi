import React from "react";
import { useState } from "react";

const Employed = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Formulario</h1>
      <form>
        <label htmlFor="name">NOMBRE/S</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">APELLIDO/S</label>
        <br />
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="user">NOMBRE DE USUARIO</label>
        <br />
        <input
          type="text"
          id="user"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <label htmlFor="password">CONTRASEÑA</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="position">CARGO/POSICION</label>
        <br />
        <select
          name="position"
          onChange={(e) => setPosition(e.target.value)}
          defaultValue=""
        >
          <option value="">---</option>
          <option value="Empleado">Empleado</option>
          <option value="Camionero">Camionero</option>
        </select>
        <br />
        <button type="submit">CARGAR USUARIO</button>
      </form>
    </>
  );
};

export default Employed;
