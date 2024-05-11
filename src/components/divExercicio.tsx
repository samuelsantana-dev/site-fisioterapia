import { Exercise } from '../api/interface';

interface DivExerciciosProps {
  exercicios: Exercise[];
}

export function DivExercicios({ exercicios }: DivExerciciosProps) {
  return (
    <div className="p-4 flex flex-wrap items-stretch justify-center items-center">
      {exercicios.map((exercicio) => (
        <div className="card lg:card-side bg-base-100 shadow-xl" key={exercicio.exercise_id}>
         <iframe className="aspect-video" src={exercicio.file}></iframe>
        <div className="card-body">
            <h2 className="card-title text-center font-bold">{exercicio.name}</h2>
            <p className="text-center">{exercicio.description}</p>
            <p className="text-sm font-semibold">Muscle: {exercicio.muscle}</p>
            <p className="text-sm font-semibold">Muscle Group: {exercicio.muscle_group}</p>
            <p className="text-sm font-semibold">Difficulty: {exercicio.difficulty}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}

{/* <div 
          className="card m-2 min-h-36 min-w-14	bg-base-100 shadow-xl sm:w-1/2 md:w-1/3 lg:w-1/4" 
          key={exercicio.exercise_id}
        >
          <div className="overflow-hidden shadow-xl">
            <iframe className="aspect-video" src={exercicio.file}></iframe>
          </div>
          <div className="card-body">
            <h2 className="card-title text-lg text-center font-bold">{exercicio.name}</h2>
            <p className="text-center">{exercicio.description}</p>
            <p className="text-sm font-semibold">Muscle: {exercicio.muscle}</p>
            <p className="text-sm font-semibold">Muscle Group: {exercicio.muscle_group}</p>
            <p className="text-sm font-semibold">Difficulty: {exercicio.difficulty}</p>
          </div>
        </div>
 */}