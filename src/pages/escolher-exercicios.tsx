import { Link } from 'react-router-dom';
import { exerciciosInferiores, exerciciosSuperiores } from '../routes/links';
import ImagemExercicio from '../assets/fisioterapia-escolher-exercicios.png';
import buttonPadrao from '../components/button/button-padrao';

export function EscolherExercicios() {
  
  return (
    <>    
        <div className="flex flex-col items-center justify-center min-h-screen w-full lg:flex-row bg-backgroundMain">
          <div className="card place-items-center w-full lg:w-1/2">
            <div className="text-center px-4 py-8 md:m-1">
              <p className="text-lg">
                Especializados no atendimento a idosos, oferecemos uma variedade de exercícios direcionados por especialistas. Escolha abaixo entre exercícios para membros inferiores ou superiores e comece a cuidar da sua saúde hoje mesmo.
              </p>
              
              <div className="flex justify-center m-1">
                <Link
                  to={exerciciosSuperiores.href} 
                  rel={exerciciosSuperiores.rel}  
                  {...buttonPadrao}
                >
                  Membros Superiores
                </Link>
                <Link 
                  to={exerciciosInferiores.href} 
                  rel={exerciciosInferiores.rel}  
                  {...buttonPadrao}
                >
                  Membros Inferiores
                </Link>

              </div>
            </div>
          </div>
          
          <div className="flex-grow card place-items-center w-full lg:w-1/2">
            <img
              src={ImagemExercicio}
              alt="Idosa dando um joia"
              className='h-auto w-96 rounded-lg card lg:w-full'
            />
          </div>
        </div>
    </>
  );
}
