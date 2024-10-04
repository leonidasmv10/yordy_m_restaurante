import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Restaurante</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/carta">Carta</Nav.Link>
                        <Nav.Link as={Link} to="/menu">Menú Semanal</Nav.Link>
                        <Nav.Link as={Link} to="/reserva">Formulario de Reserva</Nav.Link>
                        <Nav.Link as={Link} to="/visitas">Libro de visitas</Nav.Link>
                        <NavDropdown title="Administrador" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/menu">Gestionar Menú Semanal</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/reserva">Ver Reservas</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/opiniones">Gestionar Opiniones</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
