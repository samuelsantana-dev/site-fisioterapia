import '../style/home.scss';
import { Image } from 'react-bootstrap';

export function Home(){
    return(
        <section id="Home" className="hero">

            <h1>Jadson sobrenome</h1>

            <div className="hero_conteudo">

                <div className="hero_img">
                  <Image src='src\assets\fotoIntrodução.png' className='imagem_hero'  alt='imagem de perfil' />
                </div>

                <div className="hero_texto">
                    <h1>Site de fisioterapia <span> para o seu bem estar</span> o tempo todo</h1>
                    <p>Inicie seus exercicios fisicos e tenha uma melhor qualidade de vida</p>
                    <button
                     className="btn_outline" 
                     >
                      <span>Faça Login</span>
                    </button>
                </div>

            </div>
    
        </section>
    )
}