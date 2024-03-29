import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { login, termoConcenso } from '../routes/links';
import '../style/home.scss';
import { Image } from 'react-bootstrap';

export function Home(){
    return(
      <>
      <Header />
        <section id="Home" className="hero">

            <h1>Jadson sobrenome</h1>

            <div className="hero_conteudo">

                <div className="hero_img">
                  <Image src='src\assets\fotoIntrodução.png' className='imagem_hero'  alt='imagem de perfil' />
                </div>

                <div className="hero_texto">
                    <h1>Site de fisioterapia <span> para o seu bem estar</span> o tempo todo</h1>
                    <p>Inicie seus exercicios fisicos e tenha uma melhor qualidade de vida</p>
                    
                      <div className='link'>
                        <a
                        href={login.href}
                        rel={login.rel}  
                                            //   target={login.target}
                        className={login.className}
                        >
                          {login.value}
                        </a>
                        <a
                        href={login.href}
                        rel={login.rel}  
                                            //   target={login.target}
                        className={login.className}
                        >
                          {termoConcenso.value}
                        </a>
                      </div>
                </div>

            </div>
    
        </section>
        <Footer />
      </>
    )
}