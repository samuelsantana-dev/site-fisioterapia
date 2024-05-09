import { Link } from 'react-router-dom';
import imagemHome from '../assets/fotoIntrodução.png'
import buttonPadrao from '../components/button/button-padrao';


export function Home(){
    return(
      <>
        <div className="hero min-h-screen bg-backgroundMain">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={imagemHome} className="max-w-sm rounded-lg shadow-2xl" />
            <div className='max-w-sm'>
              <h1 className="text-5xl font-bold">Bem-vindo a Fisioterapia!</h1>
              <p className="py-6">Seja bem-vindo a Fisioterapia, sua plataforma de exercícios de fisioterapia. Aqui você encontrará uma variedade de exercícios projetados para ajudá-lo(a) a melhorar sua saúde e bem-estar. Comece a praticar hoje e sinta a diferença!</p>
              <Link to="/login" {...buttonPadrao}>Login</Link>
            </div>
          </div>
        </div>
      </>
    )
} 
