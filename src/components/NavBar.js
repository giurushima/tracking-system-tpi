import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">INICIO</Link>
        </li>
        <li className="nav-item">
          <Link to="/pages/Trips">VIAJES</Link>
        </li>
        <li className="nav-item">
          <Link to="/pages/Employed">EMPLEADOS</Link>
        </li>
        <li className="nav-item">
        <Link to="/pages/Receipt">RECIBOS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
