
interface Exercicio {
    videoUrl: string | undefined;
    id: string | number;
    name: string;
    text: string;
}

interface DivExerciciosProps {
    exercicios: Exercicio[];
}

export const DivExercicios: React.FC<DivExerciciosProps> = ({ exercicios }) => {
    return ( 
        <div className='d-flex'>
        {exercicios.map((exercicio) => (
          <div className="card w-96 bg-base-100 shadow-xl" id={exercicio.id.toString()} key={exercicio.id}>
             <iframe className="w-full aspect-video" src={exercicio.videoUrl}></iframe>
            <div className="card-body">
              <h2 className="card-title">{exercicio.name}</h2>
              <p>{exercicio.text}</p>
            </div>
          </div>
        ))}
        </div>
    );
  };
  

{/* <iframe className='imagem' src={exercicio.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}