import '../../src/style/escolherExercicio.scss'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { exerciciosInferiores, exerciciosSuperiores } from '../routes/links'

export function EscolherExercicios(){
    return(
        <>    
        <Header />
           <section 
       id="SobreMim" 
       className='sectionSobreMIm'
       >
            <h1>Especializados para Idosos</h1>

            <div className='conteudo'>
                <div className='DivSobreMimImagem'>
                    <img
                     src="src/assets/fotoIntrodução.png" alt="" 
                     />
                </div>
                
                <div className='divTextoSobreMim'>
                    <p>
                     Especializados no atendimento a idosos, oferecemos uma variedade de exercícios direcionados por especialistas. Escolha abaixo entre exercícios para membros inferiores ou superiores e comece a cuidar da sua saúde hoje mesmo.
                    </p>
                    <div className='divBotoes'>
                        <a 
                        href={exerciciosInferiores.href} 
                        rel={exerciciosInferiores.rel}  
                        className={exerciciosInferiores.className}
                        >
                            {exerciciosInferiores.value}
                        </a>
                       
                        <a 
                        href={exerciciosSuperiores.href} 
                        rel={exerciciosSuperiores.rel}  
                        className={exerciciosSuperiores.className}
                        >
                            {exerciciosSuperiores.value}
                        </a>
                            
                        
                    </div>
                </div>
            </div>

       </section>
       <Footer />
       </>

    )
}   