
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.scss'

export function NavBar() {
  return (

    // Define a cor de fundo da barra de navegação como "dark" e expandível para telas grandes (lg) com um tema escuro (variant="dark").
    <Navbar bg="dark" expand="lg" variant="dark" className='NavBar text-light '>
      
      {/* Utiliza um componente `Container` para envolver o conteúdo da barra de navegação. */}
      <Container>

        {/* Define o logotipo ou título da barra de navegação com um link para a âncora "#home". Também aplica classes de estilo "nome" e "h1". */}
        <Navbar.Brand href="#home" className='nome'>ROGERIO GURGEL</Navbar.Brand>

        {/* Adiciona um botão de alternância (hamburguer) para telas pequenas. */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        {/* Define a seção que será exibida quando a barra de navegação for expandida.
           O `id` "navbar-nav" e o `aria-controls` do botão de alternância devem coincidir. */}

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#Home" className="linksNavBar text-light">Home</Nav.Link>
            <Nav.Link href="#SobreMim" className="linksNavBar text-light">Sobre mim</Nav.Link>
            <Nav.Link href="#Especialidades" className="linksNavBar text-light">Especialidades</Nav.Link>
            <Nav.Link href="#Duvidas" className="linksNavBar text-light">Duvidas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

