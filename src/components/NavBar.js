import "./NavBar.css";

const NavBar = () => {
  return (
      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <a className="active" >INICIO</a>
          </li>
          <li className="nav-item" >
            <a>VIAJES</a>
          </li>
          <li className="nav-item" >
            <a>EMPLEADOS</a>
          </li>
          <li className="nav-item" >
            <a>RECIBOS</a>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;
