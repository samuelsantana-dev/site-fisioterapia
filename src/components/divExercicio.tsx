import '../style/divExercicios.scss';

interface Exercicio {
    id: string | number;
    name: string;
    image: string;
    text: string;
}

interface DivExerciciosProps {
    exercicios: Exercicio[];
}

export const DivExercicios: React.FC<DivExerciciosProps> = ({ exercicios }) => {
    return(
        <div className="divPai">
        {exercicios.map((exercicio) => (
            <div className="caixasExercicios" id={exercicio.id.toString()} key={exercicio.id}>
                <img className='imagem' src={exercicio.image} alt={exercicio.name} />
                <h3>{exercicio.name}</h3>
                <p>{exercicio.text}</p>
            </div>
        ))}
    </div>
    )
}