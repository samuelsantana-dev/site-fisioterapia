import { Exercise } from "../api/interface";

export function difficulty(difficultyValue: number){
    if(difficultyValue === 0.9){
      return 'Difícil';
    } else if(difficultyValue === 0.5){
      return 'Médio';
    } else {
      return 'Fácil';
    }
  }

  export function ordenarPorDificuldade(exercicios: Exercise[]) {
    return exercicios.sort((a, b) => a.difficulty - b.difficulty);
  }
  