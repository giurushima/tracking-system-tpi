import Location from "../maps/Location";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="primary">
        <div className="secondary">
          <h1>Bienvenidos a la pagina Web</h1>
          <h4>
            Está página les permitirá a los empleados de esta empresa
            identificarse y optar por el cargo correspondiente en la sección de
            Empleados. Les permitirá a los camioneros elegir si el viaje fue
            realizado, rechazado o quedo pendiente, en la sección de Viajes.
          </h4>
        </div>
        <Location />
      </div>
    </>
  );
};

export default Home;
