import { useState } from "react";
import "./Receipt.css";

const Receipt = () => {
  const [typeUser, setTypeUser] = useState("");
  const [hoursWorked, sethoursWorked] = useState(0);
  const [errors, setErrors] = useState(null);

  const changeTypeUserHandler = (e) => {
    setTypeUser(e.target.value);
  };
  const changeHoursWorkedHandler = (e) => {
    sethoursWorked(e.target.value);
  };

  const validationRequirementsReceipt = {
    typeUser: { required: true },
    hoursWorked: { required: true },
  };

  const validate = (receiptObject) => {
    let errors = {};
    if (receiptObject) {
      Object.keys(validationRequirementsReceipt).forEach((key) => {
        if (
          validationRequirementsReceipt[key].required &&
          !receiptObject[key]
        ) {
          errors[key] = "El campo es obligatorio.";
        }
      });
    }
    return errors;
  };

  const generateObjectReceipts = () => {
    const Data = {
      typeUser,
      hoursWorked,
    };
    return Data;
  };

  return (
    <form className="form-receipts">
      <div className="inputs-receipts">
        <h1>CALCULADORA DE SUELDOS</h1>
        <p>SELECCIONE TIPO DE USUARIO:</p>
        <select
          name="typeUser"
          value={typeUser}
          onChange={changeTypeUserHandler}
          onBlur={(e) => {
            setErrors(validate(generateObjectReceipts()));
          }}
        >
          <option value="">---</option>
          <option value="Emlpleado">Emlpleado</option>
          <option value="Camionero">Camionero</option>
        </select>
        {errors?.typeUser && <div className="red"> {errors.typeUser} </div>}
        <br />
        <label>INGRESE CANTIDAD DE HORAS TRABAJADAS:</label>
        <input
          type="number"
          min="0"
          value={hoursWorked}
          onChange={changeHoursWorkedHandler}
          onBlur={(e) => {
            setErrors(validate(generateObjectReceipts()));
          }}
        />
        {errors?.hoursWorked && (
          <div className="red"> {errors.hoursWorked} </div>
        )}
        <br />
        <button type="submit" className="btn btn-primary">
          CALCULAR COSTO
        </button>
      </div>
    </form>
  );
};

export default Receipt;
