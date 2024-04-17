import { Link } from 'react-router-dom';
import { Footer } from '../components/footer';
import { Header } from '../components/header';


export function Home(){
    return(
      <>
      <Header />
      <div className="hero min-h-screen bg-base-200" style={{backgroundColor: '#32c3d36b'}}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src='src\assets\fotoIntrodução.png' className="max-w-sm rounded-lg shadow-2xl" />
        <div>
  <h1 className="text-5xl font-bold">Bem-vindo a Fisioterapia!</h1>
  <p className="py-6">Seja bem-vindo a Fisioterapia, sua plataforma de exercícios de fisioterapia. Aqui você encontrará uma variedade de exercícios projetados para ajudá-lo(a) a melhorar sua saúde e bem-estar. Comece a praticar hoje e sinta a diferença!</p>
  <Link to="/login" className="btn btn-primary">Login</Link>
</div>

      </div>
    </div>
        <Footer />
      </>
    )
} 
