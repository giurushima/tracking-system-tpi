import Location from "../maps/Location";
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
            realizado, rechazado o quedo pendiente, en la seccion de Viajes.
          </h4>
        </div>
        <Location />
      </div>
    </>
  );
};

export default Home;
