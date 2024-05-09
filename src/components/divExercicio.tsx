import { Exercise } from '../api/interface';

interface DivExerciciosProps {
  exercicios: Exercise[];
}

export function DivExercicios({ exercicios }: DivExerciciosProps) {
  return (
    <div className="p-4 flex flex-wrap items-center justify-center w-full">
      {exercicios.map((exercicio) => (
        <div 
          className="card m-2 bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4" 
          key={exercicio.exercise_id}
        >
          <div className="overflow-hidden shadow-xl">
            <iframe className="w-full aspect-video" src={exercicio.file}></iframe>
          </div>
          <div className="card-body">
            <h2 className="card-title">{exercicio.name}</h2>
            <p>{exercicio.description}</p>
            <p>{exercicio.muscle}</p>
            <p>{exercicio.muscle_group}</p>
            <p>{exercicio.difficulty}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
