import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar className="navBg" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Nombre Empresa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              INICIO
            </Nav.Link>
            <Nav.Link as={Link} to="/pages/Trips">
              VIAJES
            </Nav.Link>
            <Nav.Link as={Link} to="/pages/Employed">
              EMPLEADOS
            </Nav.Link>
            <Nav.Link as={Link} to="/pages/Receipt">
              RECIBOS
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
