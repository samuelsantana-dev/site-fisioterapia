import { useEffect, useState } from 'react';
import { DivExercicios } from '../../components/div-exercicio';
import { Exercise } from '../../api/interface';
import { getExercicios } from '../../api/api-exercicios';
import { ordenarPorDificuldade } from '../../components/validacoes-gerais';

export const ExerciciosSuperiores = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);

  useEffect(() => {
    getExercicios()
    .then((data) => setExercicios(data))
    .catch((error) => console.error('Erro ao obter exercícios:', error));
  }, []);

  const exerciciosSuperiores = exercicios.filter((ex) => ex.muscle_group === 'superiores');
  ordenarPorDificuldade(exerciciosSuperiores);
  return (
    <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
           <div className="w-full">
            {exerciciosSuperiores.length > 0 && <DivExercicios exercicios={exerciciosSuperiores} />}
            {exerciciosSuperiores.length === 0 && <span className="loading loading-dots loading-lg"></span> && <p>Não há exercícios superiores disponíveis.</p>}
          </div>
      </section>
  );
};
