import { Exercise } from '../../api/interface';
import { difficulty } from '../validacoes-gerais';
import { useState, useCallback, memo } from 'react';
import { downloadCSVFile } from '../../utils/file-utils';
import { ExerciseCard } from './exercise-card';

interface DivExerciciosProps {
  exercicios: Exercise[];
}

export const DivExercicios = memo(({ exercicios }: DivExerciciosProps) => {
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<Set<string>>(new Set());

  const handleCheckboxChange = useCallback((exerciseId: string) => {
    setExerciciosConcluidos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  }, []);

  const generateCSVContent = useCallback(() => {
    const headers = ['Nome', 'Descrição', 'Músculo', 'Grupo do Músculo', 'Dificuldade'];
    const rows = exercicios
      .filter(exercicio => exerciciosConcluidos.has(exercicio.exercise_id ?? ''))
      .map(exercicio => [
        `"${exercicio.name.replace(/"/g, '""')}"`,
        `"${exercicio.description?.replace(/"/g, '""')}"`,
        exercicio.muscle,
        exercicio.muscle_group,
        difficulty(exercicio.difficulty)
      ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }, [exercicios, exerciciosConcluidos]);

  const handleDownloadCSV = useCallback(() => {
    const csvContent = generateCSVContent();
    downloadCSVFile(csvContent, 'exercicios_concluidos.csv');
  }, [generateCSVContent]);

  const exerciciosFiltrados = exercicios.filter(exercicio => 
    exercicio.exercise_id && exercicio.name && exercicio.description
  );

  if (exerciciosFiltrados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-5xl mb-4">🏋️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum exercício disponível</h3>
          <p className="text-gray-500">Adicione novos exercícios para começar seu treino</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciciosFiltrados.map((exercicio) => (
          <ExerciseCard
            key={exercicio.exercise_id}
            exercicio={exercicio}
            isChecked={exerciciosConcluidos.has(exercicio.exercise_id ?? '')}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
      
      {exerciciosConcluidos.size > 0 && (
        <div className="fixed bottom-6 right-6 animate-bounce">
          <button 
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={handleDownloadCSV}
            aria-label="Baixar exercícios concluídos como CSV"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar ({exerciciosConcluidos.size})
          </button>
        </div>
      )}
    </div>
  );
});


