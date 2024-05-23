import { Exercise } from '../api/interface';
import { difficulty } from './validacoes-gerais';
import { useState } from 'react';

interface DivExerciciosProps {
  exercicios: Exercise[];
}

export function DivExercicios({ exercicios }: DivExerciciosProps) {
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<string[]>([]);

  const handleCheckboxChange = (exerciseId: string) => {
    const index = exerciciosConcluidos.indexOf(exerciseId);
    if (index === -1) {
      setExerciciosConcluidos([...exerciciosConcluidos, exerciseId]);
    } else {
      const updatedExerciciosConcluidos = [...exerciciosConcluidos];
      updatedExerciciosConcluidos.splice(index, 1);
      setExerciciosConcluidos(updatedExerciciosConcluidos);
    }
  };

  const generateCSVContent = () => {
    const headers = ['Nome', 'Descrição', 'Músculo', 'Grupo do Músculo', 'Dificuldade'];
    const rows = exercicios.filter(exercicio => exerciciosConcluidos.includes(exercicio.exercise_id ?? ''))
      .map(exercicio => [exercicio.name, exercicio.description, exercicio.muscle, exercicio.muscle_group, difficulty(exercicio.difficulty)]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exercicios_concluidos.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 flex flex-wrap">
      {exercicios.map((exercicio) => (
        <div className="card p-2 m-2 lg:card-side bg-base-100 shadow-xl" key={exercicio.exercise_id}>
          <iframe className="aspect-video" src={exercicio.file} title={exercicio.name} />
          <div className="card-body">
            <h2 className="card-title text-center font-bold">{exercicio.name}</h2>
            <p>{exercicio.description}</p>
            <p className="text-sm font-semibold">Musculo: {exercicio.muscle}</p>
            <p className="text-sm font-semibold">Grupo do Musculo: {exercicio.muscle_group}</p>
            <p className="text-sm font-semibold">Dificuldade: {difficulty(exercicio.difficulty)}</p>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  onChange={() => handleCheckboxChange(exercicio.exercise_id ?? '')}
                />
                <p className="label-text text-sm font-semibold m-1">Marcar como concluído</p>
              </label>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-primary mt-4" onClick={downloadCSV}>
        Baixar CSV
      </button>
    </div>
  );
}
