import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

import "./Edit.css";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeUserHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changePositionHandler = (e) => {
    setPosition(e.target.value);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "employees", id);
    const newFields = { name, email, password, position };
    await updateDoc(userDoc, newFields);
    navigate("/employed");
  };

  const getEmployeeById = async (id) => {
    const employee = await getDoc(doc(db, "employees", id));
    if (employee.exists()) {
      console.log(employee.data());
      setName(employee.data().name);
      setEmail(employee.data().email);
      setPassword(employee.data().password);
      setPosition(employee.data().position);
    } else {
      console.log("El usuario no existe");
    }
  };

  useEffect(() => {
    getEmployeeById(id);
  }, []);

  const validEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\S+@\S+\.\S+$/);
  };

  const validationRequirementsEmployee = {
    name: { required: true },
    email: { required: true, isEmail: true},
    password: { required: true, minLength: 6 },
    position: { required: true },
  };

  const validate = (employeeObject, field) => {
    let errors = {};
    if (employeeObject) {
      Object.keys(validationRequirementsEmployee).forEach((key) => {
        if (
          validationRequirementsEmployee[key].required &&
          !employeeObject[key]
        ) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirementsEmployee[key].isEmail &&
          !validEmail(employeeObject[key]) &&
          (key === field || !field)
        ) {
          errors[key] = "Debe ingresar un email válido.";
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
      email,
      password,
      position,
    };
    return Data;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="edit">
            <h1>EDITAR USUARIO</h1>
          </div>
          <form onSubmit={updateEmployee}>
            <div className="mb-3">
              <label className="form-label">NOMBRE/S y APELLIDO/S</label>
              <input
                placeholder="ingrese su/s nombre/s"
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
              <label className="form-label">EMAIL</label>
              <input
                placeholder="ingrese su email"
                value={email}
                onChange={changeUserHandler}
                type="email"
                className="form-control"
                onBlur={(e) => {
                  setErrors(validate(generateObjectEmployee()));
                }}
              />
              {errors?.email && <div className="red"> {errors.email} </div>}
            </div>
            <div className="mb-3">
              <label className="form-label">CONTRASEÑA</label>
              <input
                placeholder="ingrese su contraseña"
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
                <option value="Predeterminado">Predeterminado</option>
                <option value="Administrador">Administrador</option>
                <option value="Empleado">Empleado</option>
                <option value="Camionero">Camionero</option>
              </select>
              {errors?.position && (
                <div className="red"> {errors.position} </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              ACTUALIZAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
