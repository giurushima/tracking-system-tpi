import { useState } from "react";
import "./Receipt.css";

const Receipt = () => {
  const [employee, setEmployee] = useState("");
  const [truckDriver, setTruckDriver] = useState("");
  const [hoursWorked, sethoursWorked] = useState("");

  const changeEmployeeHandler = (e) => {
    setEmployee(e.target.value);
  };
  const changeTruckDriverHandler = (e) => {
    setTruckDriver(e.target.value);
  };
  const changeHoursWorkedHandler = (e) => {
    sethoursWorked(e.target.value);
  };

  return (
    <form className="form-receipts">
      <div className="inputs-receipts">
        <h1>CALCULADORA DE SUELDOS</h1>
        <p>SELECCIONE TIPO DE USUARIO:</p>
        <label>EMPLEADO</label>
        <input
          type="radio"
          name="1"
          value={employee}
          onChange={changeEmployeeHandler}
        />
        <label>CAMIONERO</label>
        <input
          type="radio"
          name="1"
          value={truckDriver}
          onChange={changeTruckDriverHandler}
        />
        <br />
        <label>INGRESE CANTIDAD DE HORAS TRABAJADAS:</label>
        <input
          type="text"
          value={hoursWorked}
          onChange={changeHoursWorkedHandler}
        />
        <br />
        <button type="submit" className="btn btn-primary" >CALCULAR COSTO</button>
      </div>
    </form>
  );
};

export default Receipt;
