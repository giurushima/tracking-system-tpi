import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="primary">
        <div className="secondary">
          <h1>Bienvenidos a la pagina Web</h1>
        </div>
        <div className="third" >
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          <Nav.Link as={Link} to="/pages/Trips">
            Viajes
          </Nav.Link>
          <Nav.Link as={Link} to="/pages/Employed">
            Empleados
          </Nav.Link>
          <Nav.Link as={Link} to="/pages/Receipt">
            Recibos
          </Nav.Link>
        </div>
      </div>
    </>
  );
};

export default Home;
