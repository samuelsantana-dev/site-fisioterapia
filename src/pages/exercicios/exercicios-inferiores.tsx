import { useState, useEffect } from 'react';
import { getExercicios } from '../../api/api-exercicios';
import { Exercise } from '../../api/interface';
import { DivExercicios } from '../../components/div-exercicio';
import { ordenarPorDificuldade } from '../../components/validacoes-gerais';

export const ExerciciosInferiores = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);

  useEffect(() => {
    getExercicios()
    .then((data) => setExercicios(data))
    .catch((error) => console.error('Erro ao obter exercícios:', error));
  }, []);

  const exerciciosInferiores = exercicios.filter((ex) => ex.muscle_group === 'inferiores');
  ordenarPorDificuldade(exerciciosInferiores);
  return (
      <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
           <div className="w-full">
            {exerciciosInferiores.length > 0 && <DivExercicios exercicios={exerciciosInferiores} />}
            {exerciciosInferiores.length === 0 && <span className="loading loading-dots loading-lg"></span> && <p>Não há exercícios inferiores disponíveis.</p>}
          </div>
      </section>
  );
}
