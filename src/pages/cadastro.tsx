import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../style/cadastro.scss';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export function CadastroForm() {
  return (
    <>
      <Header />
      <div className='page'>
        <Form className='formCadastro' method='post'>
            <h1>Cadastre-se</h1>
            <p>Digite os seus dados de acesso no campo abaixo.</p>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Numbero de celular
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext type="email" placeholder="XX X XXXXXXXX" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Idade
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext type="email" placeholder="65" />
            </Col>
          </Form.Group>
              
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext type="email" placeholder="email@example.com" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <input  type="submit" value="Cadastrar" className="btnCadastro" />
        </Form>
      </div>
      <Footer />
    </>
  );
}

// class="formLogin"

