import { DivExercicios } from '../components/divExercicio';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import '../style/exerciciosSuperioresInferiores.scss';

const exercicioSuperiores = [
    { id: "exercicioUm", name: "Exercicio 1", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 1" },
    { id: "exercicioDois", name: "Exercicio 2", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 2" },
    { id: "exercicioTres", name: "Exercicio 3", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 3" },
    { id: "exercicioQuatro", name: "Exercicio 4", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 4" },
    { id: "exercicioCinco", name: "Exercicio 5", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 5" },
    { id: "exercicioSeis", name: "Exercicio 6", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 6" },
    { id: "exercicioSete", name: "Exercicio 7", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 7" },
    { id: "exercicioOito", name: "Exercicio 8", videoUrl: "https://www.youtube.com/embed/6PVDpWX4fnY?si=-z68A9vD7AfMPo51", text: "Descrição do Exercício 7" }
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