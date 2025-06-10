import { useEffect, useState } from 'react';
import { DivExercicios } from '../../components/layout/div-exercicio';
import { Exercise } from '../../api/interface';
import { getExercicios } from '../../api/api-exercicios';

export const ExerciciosAerobicos = () => {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        setIsLoading(true);
        const data = await getExercicios();
        const filteredExercicios = data
          .filter((ex: any) => ex.muscle_group === 'aerobicos')
          .sort((a: any, b: any) => a.difficulty - b.difficulty);
        
        setExercicios(filteredExercicios);
      } catch (err) {
        console.error('Erro ao obter exercícios:', err);
        setError('Falha ao carregar exercícios. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercicios();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </section>
    );
  }

  if (exercicios.length === 0) {
    return (
      <section className="bg-backgroundMain w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Não há exercícios aeróbicos disponíveis no momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-backgroundMain w-full min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Exercícios Aeróbicos</h1>
        <DivExercicios exercicios={exercicios} />
      </div>
    </section>
  );
};