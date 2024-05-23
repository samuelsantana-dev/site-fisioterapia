import { Link } from 'react-router-dom';
import { exerciciosAerobicos, exerciciosInferiores, exerciciosSuperiores } from '../routes/links';
import ImagemExercicio from '../assets/fisioterapia-escolher-exercicios.png';
import buttonPadrao from '../components/button/button-padrao';

export function EscolherExercicios() {
  
  return (
    <>    
      <div className="flex flex-col items-center justify-center min-h-screen w-full lg:flex-row bg-backgroundMain p-4">
        <div className="card place-items-center w-full lg:w-1/2 lg:p-8">
          <div className="text-center px-4 py-8">
            <p className="text-lg mb-4">
              Especializados no atendimento a idosos, oferecemos uma variedade de exercícios direcionados por especialistas. Escolha abaixo entre exercícios para membros inferiores ou superiores e comece a cuidar da sua saúde hoje mesmo.
            </p>
            
            <div className="flex flex-col lg:flex-row justify-center gap-4">
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
              <Link 
                to={exerciciosAerobicos.href} 
                rel={exerciciosAerobicos.rel}  
                {...buttonPadrao}
              >
                Exercicios Aerobicos
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex-grow card place-items-center w-full lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={ImagemExercicio}
            alt="Idosa dando um joia"
            className='h-auto w-full max-w-sm lg:max-w-full rounded-lg'
          />
        </div>
      </div>
    </>
  );
}
