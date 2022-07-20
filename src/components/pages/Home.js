import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="primary">
        <div className="secondary">
          <h1>Bienvenidos a la pagina Web</h1>
          <h4>
            Esta pagina le permitira a los empleados de esta empresa
            identificarse y optar por el cargo correspondiente en la seccion de
            Empleados. Le permitira a los camioneros elegir si el viaje fue
            realizado, rechazado o quedo pendiente, en la seccion de Viajes. En
            la seccion Recibos tanto el empleado como el camionero podran elegir
            se ocupacion, ingresar las horas trabajdas y calcular su sueldo.{" "}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;
