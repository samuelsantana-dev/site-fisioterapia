import React from 'react';

interface Exercicio {
  videoUrl: string | undefined;
  id: string | number;
  name: string;
  text: string;
}

interface DivExerciciosProps {
  exercicios: Exercicio[];
}

export const DivExercicios: React.FC<DivExerciciosProps> = ({ exercicios }) => {
  return (
    <div className="p-4 flex flex-wrap w-full">
      {exercicios.map((exercicio) => (
        <div className="card m-2 bg-base-100 shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4" id={exercicio.id.toString()} key={exercicio.id}>
          <div className="overflow-hidden shadow-xl">
            <iframe className="w-full aspect-video" src={exercicio.videoUrl}></iframe>
          </div>
          <div className="card-body">
            <h2 className="card-title">{exercicio.name}</h2>
            <p>{exercicio.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
