import { Exercise } from '../api/interface';

interface DivExerciciosProps {
  exercicios: Exercise[];
}


export function DivExercicios({ exercicios }: DivExerciciosProps) {
  return (
    <div className="p-4 flex flex-wrap">
      {exercicios.map((exercicio) => (
        <div className="card p-2 m-2 lg:card-side bg-base-100 shadow-xl" key={exercicio.exercise_id}>
         <iframe className="aspect-video" src={exercicio.file}></iframe>
          <div className="card-body">
              <h2 className="card-title text-center font-bold">{exercicio.name}</h2>
              <p>{exercicio.description}</p>
              <p className="text-sm font-semibold">Muscle: {exercicio.muscle}</p>
              <p className="text-sm font-semibold">Muscle Group: {exercicio.muscle_group}</p>
              <p className="text-sm font-semibold">Difficulty: {exercicio.difficulty}</p>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-info" 
                  />
                  <p className="label-text text-sm font-semibold m-1">Marcar como concluído</p>
                </label>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
}