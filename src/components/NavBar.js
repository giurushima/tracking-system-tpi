import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import firebaseApp from "./firebase/firebase-config";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

const NavBar = () => {
  return (
    <Navbar className="navBg" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Speedy Truck
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              INICIO
            </Nav.Link>
            <Nav.Link as={Link} to="/Trips">
              VIAJES
            </Nav.Link>
            <Nav.Link as={Link} to="/Employed">
              EMPLEADOS
            </Nav.Link>
            <Nav.Link as={Link} to="/Map">
              MAPA
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="p-1" >
        <button className="btn btn-primary " onClick={() => signOut(auth)}>
          Cerrar sesión
        </button>
      </div>
    </Navbar>
  );
};

export default NavBar;
