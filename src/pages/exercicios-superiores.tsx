import { DivExercicios } from '../components/divExercicio';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import '../style/exerciciosSuperioresInferiores.scss';

const exercicioSuperiores = [
    { id: "exercicioUm", name: "Exercicio 1", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 1" },
    { id: "exercicioDois", name: "Exercicio 2", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 2" },
    { id: "exercicioTres", name: "Exercicio 3", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 3" },
    { id: "exercicioQuatro", name: "Exercicio 4", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 4" },
    { id: "exercicioCinco", name: "Exercicio 5", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 5" },
    { id: "exercicioSeis", name: "Exercicio 6", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 6" },
    { id: "exercicioSete", name: "Exercicio 7", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 7" },
    { id: "exercicioOito", name: "Exercicio 8", image: "src/assets/fotoIntrodução.png", text: "Descrição do Exercício 7" }
];


export const ExerciciosSuperiores = () => {
    return(
      <>
      <Header />
        <section className="exerciciosInferiores">
        
          <div>
            <h1>Exercicios Superiores</h1>
          </div>

          <DivExercicios exercicios={exercicioSuperiores} />

          <div>
            <a href="/">Voltar a pagina inicial</a>
            
          </div>
      </section>
      <Footer />
      </>
    )
}