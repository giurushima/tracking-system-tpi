import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

import "./Create.css"

const Create = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "employees");

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const changeUserHandler = (e) => {
    setUser(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changePositionHandler = (e) => {
    setPosition(e.target.value);
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionRef, {
      name,
      lastName,
      user,
      password,
      position,
    });
    navigate("/show");
  };

  const validationRequirementsEmployee = {
    name: { required: true },
    lastName: { required: true },
    user: { required: true, minLength: 6 },
    password: { required: true, minLength: 6 },
    position: { required: true },
  };

  const validate = (employeeObject) => {
    let errors = {};
    if (employeeObject) {
      Object.keys(validationRequirementsEmployee).forEach((key) => {
        if (
          validationRequirementsEmployee[key].required &&
          !employeeObject[key]
        ) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirementsEmployee[key].minLength > 0 &&
          employeeObject[key].length <
            validationRequirementsEmployee[key].minLength
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
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Cargar usuario</h1>
          <form onSubmit={createEmployee}>
            <div className="mb-3">
              <label className="form-label">NOMBRE/S</label>
              <input
                value={name}
                onChange={changeNameHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              />
              {errors?.name && <div className="red"> {errors.name} </div>}
            </div>
            <div className="mb-3">
              <label className="form-label">APELLIDO/S</label>
              <input
                value={lastName}
                onChange={changeLastNameHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              />
              {errors?.lastName && (
                <div className="red"> {errors.lastName} </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">NOMBRE DE USUARIO</label>
              <input
                value={user}
                onChange={changeUserHandler}
                type="text"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              />
              {errors?.user && <div className="red"> {errors.user} </div>}
            </div>
            <div className="mb-3">
              <label className="form-label">CONTRASEÑA</label>
              <input
                value={password}
                onChange={changePasswordHandler}
                type="password"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              />
              {errors?.password && (
                <div className="red"> {errors.password} </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="position">CARGO/POSICION</label>
              <select
                value={position}
                name="position"
                className="form-control"
                onChange={changePositionHandler}
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              >
                <option value="">---</option>
                <option value="Empleado">Empleado</option>
                <option value="Camionero">Camionero</option>
              </select>
              {errors?.position && (
                <div className="red"> {errors.position} </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              CARGAR USUARIO
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
