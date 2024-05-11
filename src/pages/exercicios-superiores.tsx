import { useEffect, useState } from 'react';
import { DivExercicios } from '../components/divExercicio';
import { Exercise } from '../api/interface';
import { getExercicios } from '../api/api-exercicios';

export const ExerciciosSuperiores = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);

  useEffect(() => {
    getExercicios()
    .then((data) => setExercicios(data))
    .catch((error) => console.error('Erro ao obter exercícios:', error));
  }, []);

  return (
    <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
           <div className="w-full">
            <DivExercicios exercicios={exercicios} />
          </div>
      </section>
  );
};
