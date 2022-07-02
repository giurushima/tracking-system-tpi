import React from "react";
import { useState } from "react";
import "./Employed.css";
import firebaseApp from "../firebase/firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

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

const Employed = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState(null);

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

  const validationRequirementsEmployee = {
    name: { required: true },
    lastName: { required: true },
    user: { required: true, minLength: 5 },
    password: { required: true, minLength: 5 },
    position: { required: true },
  };

  const validate = (employeeObject) => {
    let errors = {};
    if (employeeObject) {
      Object.keys(validationRequirementsEmployee).forEach((key) => {
        if (validationRequirementsEmployee[key].required && !employeeObject[key]) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirementsEmployee[key].minLength > 0 &&
          employeeObject[key].length < validationRequirementsEmployee[key].minLength
        ) {
          errors[key] =
            "El campo debe terner al menos " +
            validationRequirementsEmployee[key].minLength +
            " caracteres.";
        }
      });
    }
    return errors;
  };


  const generateObjectEmployee = () => {
    const Data = {
      name,
      lastName,
      user,
      password,
      position,
    };
    return Data;
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
            onBlur={(e) => {
              setErrors(validate(generateObjectEmployee()));
            }}
          />
          {errors?.name && <div className="red"> {errors.name} </div>}
          <br />
          <label htmlFor="lastName">APELLIDO/S</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={changeLastNameHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectEmployee()));
            }}
          />
          {errors?.lastName && <div className="red"> {errors.lastName} </div>}
          <br />
          <label htmlFor="user">NOMBRE DE USUARIO</label>
          <br />
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={changeUserHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectEmployee()));
            }}
          />
          {errors?.user && <div className="red"> {errors.user} </div>}
          <br />
          <label htmlFor="password">CONTRASEÑA</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={changePasswordHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectEmployee()));
            }}
          />
          {errors?.password && <div className="red"> {errors.password} </div>}
          <br />
          <label htmlFor="position">CARGO/POSICION</label>
          <br />
          <select
            value={position}
            name="position"
            onChange={changePositionHandler}
            onBlur={(e) => {
              setErrors(validate(generateObjectEmployee()));
            }}
          >
            <option value="">---</option>
            <option value="Empleado">Empleado</option>
            <option value="Camionero">Camionero</option>
          </select>
          {errors?.position && <div className="red"> {errors.position} </div>}
          <br />
          <button type="submit" className="btn btn-primary" onSubmit={userRegister(user, password)}>
            CARGAR USUARIO
          </button>
        </div>
      </form>
    </>
  );
};

export default Employed;
