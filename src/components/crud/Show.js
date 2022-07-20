import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-configDB";

const Show = () => {
  const [employees, setEmployees] = useState([]);

  const usersCollectionRef = collection(db, "employees");

  const getUsers = async () => {
    const getEmployeesData = await getDocs(usersCollectionRef);
    setEmployees(
      getEmployeesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteEmployee = async (id) => {
    const userDoc = doc(db, "employees", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
                CARGAR USUARIO
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Nombre/s</th>
                  <th>Apellido/s</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Cargo/Posicion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.user}</td>
                    <td>{employee.password}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Link
                        to={`/edit/${employee.id}`}
                        className="btn btn-light"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => {
                          deleteEmployee(employee.id);
                        }}
                        className="btn btn-danger"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
