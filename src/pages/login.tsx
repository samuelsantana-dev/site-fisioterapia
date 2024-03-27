import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../style/login.scss';

export function LoginForm() {
  return (
    <div className='page'>
    <Form className='formLogin'>
        <h1>Login</h1>
            <p>Digite os seus dados de acesso no campo abaixo.</p>
           
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

      <input type="submit" value="Acessar" className="btn" />
    </Form>
    </div>
  );
}

// class="formLogin"

