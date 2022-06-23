import "./Receipt.css";

const Receipt = () => {
  return (
    <form className="form-receipts">
      <div className="inputs">
        <h2>Calculadora de sueldos</h2>
        <p>Seleccione tipo de usuario:</p>
        <label>Empleado</label>
        <input type="radio" name="1" />
        <label>Camionero</label>
        <input type="radio" name="1" />
        <br />
        <label>Ingrese cantidad de horas trabajadas:</label>
        <input type="text" />
        <br />
        <button type="submit" className="btn">Calcular costo</button>
      </div>
    </form>
  );
};

export default Receipt;
