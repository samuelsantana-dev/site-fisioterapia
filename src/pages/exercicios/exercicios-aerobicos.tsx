import { useEffect, useState } from 'react';
import { DivExercicios } from '../../components/div-exercicio';
import { Exercise } from '../../api/interface';
import { getExercicios } from '../../api/api-exercicios';

export const ExerciciosAerobicos = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);

  useEffect(() => {
    getExercicios()
      .then((data) => setExercicios(data))
      .catch((error) => console.error('Erro ao obter exercícios:', error));
  }, []);

  exercicios.filter((ex) => ex.muscle_group === 'aerobicos').sort((a, b) => a.difficulty - b.difficulty);

  return (
    <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
      <div className="w-full">
        {exercicios.length > 0 && <DivExercicios exercicios={exercicios} />}
        {exercicios.length === 0 && <span className="loading loading-dots loading-lg"></span> && <p>Não há exercícios aerobicos disponíveis.</p>}
      </div>
    </section>
  );
};

