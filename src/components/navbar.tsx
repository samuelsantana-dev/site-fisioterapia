import { Container, Navbar, Nav } from 'react-bootstrap';
import '../css/components/navbar.css';

export function NavBar() {
  return (
      <Container fluid id="app-header" className='m-1 p-2'>
        <Navbar className="navigation m-2" expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navigation__links">
              <Nav.Link href="#" className="navigation__link">Home</Nav.Link>
              <Nav.Link href="#" className="navigation__link">Story</Nav.Link>
              <Nav.Link href="#" className="navigation__link">Wallpapers</Nav.Link>
              <Nav.Link href="#" className="navigation__link">Trailer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
  );
}


