import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../style/termoConcenso.scss';
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
      <div className='div'>
              

            
        <Form className='formTermo' onSubmit={handleSubmit}>
        <div>
                <h1>TERMO DE CONSENTIMENTO</h1>
                <p>
                  Eu, <b>[nome completo]</b>, <b>[nacionalidade]</b>, <b>[idade]</b>, <b>[estado civil]</b>, <b>[profissão]</b>, residente em <b>[endereço]</b>, portador do RG <b>[número do RG]</b>, sou convidado a participar do estudo intitulado "<b>[título da pesquisa]</b>". Os objetivos e justificativas deste estudo são <b>[descreva os objetivos e justificativas de forma clara e acessível]</b>. Minha participação neste estudo envolverá <b>[descreva o procedimento terapêutico de forma compreensível, evitando termos técnicos]</b>.
                  Fui informado de que posso esperar alguns benefícios decorrentes deste estudo, tais como <b>[descreva os benefícios esperados de maneira acessível]</b>. Também fui alertado sobre os possíveis desconfortos e riscos que podem surgir durante o estudo. Estes podem incluir <b>[descreva os desconfortos e riscos potenciais de forma clara e acessível]</b>.
                  É assegurado que minha privacidade será respeitada, e que qualquer informação que possa me identificar será mantida em sigilo. Além disso, tenho o direito de recusar ou retirar meu consentimento a qualquer momento, sem precisar justificar minha decisão. Não sofrerei qualquer prejuízo à assistência que estou recebendo, caso opte por não participar do estudo. Também tenho o direito de escolher métodos alternativos, os quais incluem <b>[descreva os métodos alternativos disponíveis]</b>. Os pesquisadores responsáveis por este estudo são <b>[nomes dos pesquisadores]</b> e podem ser contatados pelos telefones <b>[números de telefone]</b>. Durante todo o estudo, estarei recebendo assistência e terei acesso a todas as informações adicionais necessárias sobre o estudo e suas consequências. Ao assinar este termo, manifesto meu consentimento livre e informado para participar do estudo, ciente de que não há nenhum valor econômico envolvido em minha participação.
                  </p>
              </div>

          <Form.Group as={Row} controlId="formBasicCheckbox">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check 
                type="checkbox" 
                label="Eu li e aceito os termos e condições"
                onChange={handleTermosChange} 
               />
            </Col>
          </Form.Group>

          <input type="submit" value="Assinar Contrato" className="btnTerm" disabled={!aceitoTermos} />
        </Form>
        </div>
    
      <Footer />
    </>
  );
}
