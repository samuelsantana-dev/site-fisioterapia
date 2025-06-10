import { memo } from "react";
import { difficulty } from "../validacoes-gerais";
import { Exercise } from "../../api/interface";

interface ExerciseCardProps {
  exercicio: Exercise;
  isChecked: boolean;
  onCheckboxChange: (id: string) => void;
}
export const ExerciseCard = memo(({ exercicio, isChecked, onCheckboxChange }: ExerciseCardProps) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
    <div className="relative aspect-video bg-gray-100">
      <iframe 
        src={exercicio.file} 
        title={exercicio.name}
        className="absolute inset-0 w-full h-full object-cover"
        allowFullScreen
        loading="lazy"
      />
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {difficulty(exercicio.difficulty)}
      </div>
    </div>
    
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{exercicio.name}</h3>
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheckboxChange(exercicio.exercise_id ?? '')}
              className="sr-only"
            />
            <div className={`block w-6 h-6 rounded-full ${isChecked ? 'bg-blue-500' : 'bg-gray-300'} transition`}>
              {isChecked && (
                <svg className="w-4 h-4 mx-auto mt-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{exercicio.description}</p>
      
      <div className="flex flex-wrap gap-2">
        <PillBadge icon="💪" text={exercicio.muscle} />
        <PillBadge icon="👥" text={exercicio.muscle_group} />
      </div>
    </div>
  </div>
));

export const PillBadge = memo(({ icon, text }: { icon: string; text?: string }) => (
  text ? (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
      {icon} {text}
    </span>
  ) : null
));