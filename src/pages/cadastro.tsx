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

            <Form.Group as={Row} className="mb-3" controlId="formFotoPerfil">
            <Form.Label column sm="2">
              Foto de Perfil
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" placeholder="Escolha uma foto" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formNomeCompleto">
            <Form.Label column sm="2">
              Nome Completo
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Digite seu nome completo" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formDataNascimento">
            <Form.Label column sm="2">
              Data de Nascimento
            </Form.Label>
            <Col sm="10">
              <Form.Control type="date" placeholder="DD/MM/AAAA" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              E-mail
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="Digite seu e-mail" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formNumeroCelular">
            <Form.Label column sm="2">
              Número de Celular
            </Form.Label>
            <Col sm="10">
              <Form.Control type="tel" placeholder="(XX) X XXXX-XXXX" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formSexo">
            <Form.Label column sm="2">
              Sexo
            </Form.Label>
            <Col sm="10">
              <Form.Control as="select">
                <option>Outro</option>
                <option>Masculino</option>
                <option>Feminino</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formDiagnostico">
            <Form.Label column sm="2">
              Diagnóstico
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Digite seu diagnóstico" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formSenha">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Digite sua senha" />
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

