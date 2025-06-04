import { useEffect, useState } from 'react';
import { DivExercicios } from '../../components/div-exercicio';
import { Exercise } from '../../api/interface';
import { getExercicios } from '../../api/api-exercicios';
import { ordenarPorDificuldade } from '../../components/validacoes-gerais';

export const ExerciciosSuperiores = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const data = await getExercicios();
        const superiores = data.filter((ex: any) => ex.muscle_group === 'superiores');
        ordenarPorDificuldade(superiores);
        setExercicios(superiores);
      } catch (error) {
        console.error('Erro ao obter exercícios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercicios();
  }, []);

  return (
    <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
      <div className="w-full text-center">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}

        {!isLoading && exercicios.length > 0 && (
          <DivExercicios exercicios={exercicios} />
        )}

        {!isLoading && exercicios.length === 0 && (
          <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Falha ao carregar exercícios. Tente novamente mais tarde.</span>
        </div>
      </section>
        )}
      </div>
    </section>
  );
};
