import { useState, useEffect } from 'react';
import { getExercicios } from '../api/api-exercicios';
import { Exercise } from '../api/interface';
import { DivExercicios } from '../components/divExercicio';

export const ExerciciosInferiores = () => {
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
}
