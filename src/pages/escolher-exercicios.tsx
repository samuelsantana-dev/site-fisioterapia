import { Link } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { exerciciosInferiores, exerciciosSuperiores } from '../routes/links';
import buttonPadrao from '../components/button/button-padrao';

export function EscolherExercicios() {
    return (
      <>    
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen w-full lg:flex-row bg-backgroundMain">
        <div className="flex-grow grid h-auto card place-items-center w-full lg:w-1/2">
            <div className="text-center px-4 py-8">
              <p className="text-lg">
                Especializados no atendimento a idosos, oferecemos uma variedade de exercícios direcionados por especialistas. Escolha abaixo entre exercícios para membros inferiores ou superiores e comece a cuidar da sua saúde hoje mesmo.
              </p>
              <div className="flex justify-center mt-6">
                <Link
                  to={exerciciosSuperiores.href} 
                  rel={exerciciosSuperiores.rel}  
                  {...buttonPadrao}
                >
                  {exerciciosSuperiores.value}
                </Link>
                <Link 
                  to={exerciciosInferiores.href} 
                  rel={exerciciosInferiores.rel}  
                  {...buttonPadrao}
                >
                  {exerciciosInferiores.value}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-grow m-4 grid card place-items-center w-full lg:w-1/2">
            <img
              src="src/assets/fisioterapiaEscolherExercicios.png"
              alt="Idosa dando um joia"
              className='w-full h-auto md:max-w-xs lg:max-w-full'
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
