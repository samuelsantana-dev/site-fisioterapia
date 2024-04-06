import '../style/divExercicios.scss';

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
    return(
        <div className="divPai">
  {exercicios.map((exercicio) => (
      <div className="caixasExercicios" id={exercicio.id.toString()} key={exercicio.id}>
           <iframe className='imagem' src={exercicio.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <h3>{exercicio.name}</h3>
          <p>{exercicio.text}</p>
      </div>
  ))}
</div>
    )
}


//   <div className="divPai">
//   {exercicios.map((exercicio) => (
//       <div className="caixasExercicios" id={exercicio.id.toString()} key={exercicio.id}>
//           <video>
//            <source controls className='imagem' src={exercicio.image}  type="video/mp4" />
//           </video>
//           <h3>{exercicio.name}</h3>
//           <p>{exercicio.text}</p>
//       </div>
//   ))}
// </div>
 //alt={exercicio.name} tirar o alt das iamgens
