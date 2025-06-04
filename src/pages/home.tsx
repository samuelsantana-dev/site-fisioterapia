import { Link } from 'react-router-dom';
import imagemHome from '../assets/fotoIntrodução.png';
import buttonPadrao from '../components/button/button-padrao';

export function Home() {
  return (
    <section className="hero min-h-screen bg-backgroundMain">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 px-6">
        <img
          src={imagemHome}
          alt="Ilustração introdutória"
          className="max-w-sm rounded-lg shadow-2xl"
        />

        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Bem-vindo à EXERLAR!
          </h1>
          <p className="py-6 text-base md:text-lg text-gray-700">
            Seja bem-vindo à EXERLAR, um site educativo com um protocolo de
            exercícios físicos voltado para pessoas idosas no ambiente do lar.
            Aqui você encontrará uma variedade de exercícios projetados para
            melhorar sua saúde e bem-estar. Comece a praticar hoje e sinta a
            diferença!
          </p>
          <Link to="/login" {...buttonPadrao}>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
