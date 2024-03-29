import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../style/login.scss';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export function TermoConcenso() {
  const [aceitoTermos, setAceitoTermos] = useState(false);

  const handleTermosChange = () => {
    setAceitoTermos(!aceitoTermos);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implemente sua lógica de submissão aqui
    console.log("Formulário enviado!");
  };

  return (
    <>
      <Header />
      <div className='page'>
        <Form className='formLogin' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Digite os seus dados de acesso no campo abaixo.</p>
         <p>
            **TERMO DE CONSENTIMENTO INFORMADO**

            Eu, [nome completo], [nacionalidade], [idade], [estado civil], [profissão], residente em [endereço], portador do RG [número do RG], sou convidado a participar do estudo intitulado "[título da pesquisa]". Os objetivos e justificativas deste estudo são [descreva os objetivos e justificativas de forma clara e acessível].

            Minha participação neste estudo envolverá [descreva o procedimento terapêutico de forma compreensível, evitando termos técnicos]. 

            Fui informado de que posso esperar alguns benefícios decorrentes deste estudo, tais como [descreva os benefícios esperados de maneira acessível].

            Também fui alertado sobre os possíveis desconfortos e riscos que podem surgir durante o estudo. Estes podem incluir [descreva os desconfortos e riscos potenciais de forma clara e acessível].

            É assegurado que minha privacidade será respeitada, e que qualquer informação que possa me identificar será mantida em sigilo.

            Além disso, tenho o direito de recusar ou retirar meu consentimento a qualquer momento, sem precisar justificar minha decisão. Não sofrerei qualquer prejuízo à assistência que estou recebendo, caso opte por não participar do estudo. Também tenho o direito de escolher métodos alternativos, os quais incluem [descreva os métodos alternativos disponíveis].

            Os pesquisadores responsáveis por este estudo são [nomes dos pesquisadores] e podem ser contatados pelos telefones [números de telefone].

            Durante todo o estudo, estarei recebendo assistência e terei acesso a todas as informações adicionais necessárias sobre o estudo e suas consequências.

            Ao assinar este termo, manifesto meu consentimento livre e informado para participar do estudo, ciente de que não há nenhum valor econômico envolvido em minha participação.

            Assinatura: ___________________________

            Data: _________________________________
          </p>

          <Form.Group as={Row} controlId="formBasicCheckbox">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check 
                type="checkbox" 
                label="Eu li e aceito os termos e condições"
                onChange={handleTermosChange} 
               />
            </Col>
          </Form.Group>

          <input type="submit" value="Cadastrar" className="btn" disabled={!aceitoTermos} />
        </Form>
      </div>
      <Footer />
    </>
  );
}
