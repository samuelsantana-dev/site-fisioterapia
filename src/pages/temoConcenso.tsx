
// import '../style/termoConcenso.scss';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Link } from 'react-router-dom';
import buttonPadrao from '../components/button/button-padrao';

export function TermoConcenso() {
  return (
    <>
      <Header />
      <div className="hero min-h-screen bg-backgroundMain">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">TERMO DE CONSENSO</h1>
            <p className="py-6">
              Eu, <b>[nome completo]</b>, <b>[nacionalidade]</b>, <b>[idade]</b>, <b>[estado civil]</b>, <b>[profissão]</b>, residente em <b>[endereço]</b>, portador do RG <b>[número do RG]</b>, sou convidado a participar do estudo intitulado "<b>[título da pesquisa]</b>". Os objetivos e justificativas deste estudo são <b>[descreva os objetivos e justificativas de forma clara e acessível]</b>. Minha participação neste estudo envolverá <b>[descreva o procedimento terapêutico de forma compreensível, evitando termos técnicos]</b>.
              Fui informado de que posso esperar alguns benefícios decorrentes deste estudo, tais como <b>[descreva os benefícios esperados de maneira acessível]</b>. Também fui alertado sobre os possíveis desconfortos e riscos que podem surgir durante o estudo. Estes podem incluir <b>[descreva os desconfortos e riscos potenciais de forma clara e acessível]</b>.
              É assegurado que minha privacidade será respeitada, e que qualquer informação que possa me identificar será mantida em sigilo. Além disso, tenho o direito de recusar ou retirar meu consentimento a qualquer momento, sem precisar justificar minha decisão. Não sofrerei qualquer prejuízo à assistência que estou recebendo, caso opte por não participar do estudo. Também tenho o direito de escolher métodos alternativos, os quais incluem <b>[descreva os métodos alternativos disponíveis]</b>. Os pesquisadores responsáveis por este estudo são <b>[nomes dos pesquisadores]</b> e podem ser contatados pelos telefones <b>[números de telefone]</b>. Durante todo o estudo, estarei recebendo assistência e terei acesso a todas as informações adicionais necessárias sobre o estudo e suas consequências. Ao assinar este termo, manifesto meu consentimento livre e informado para participar do estudo, ciente de que não há nenhum valor econômico envolvido em minha participação.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Digite a frase</span>
                </label>
                <input type="password" placeholder="Eu nome completo aceito o termo" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                 <Link to="/login"{...buttonPadrao}>Aceitar termo</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}