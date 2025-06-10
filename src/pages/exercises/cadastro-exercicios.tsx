import { cadastroExercicioApi } from '../../api/api-exercicios';
import { ExerciseForm } from '../formulario-props/exercicio-props';
import { Exercise } from '../../api/interface';

export function CadastroExercicios() {
  const formExercicio = {
    muscle_group: "",
    muscle: "",
    difficulty: 0,
    name: "",
    reps: 0,
    description: "",
    instructions: [],
    file: ""
  }
  
  const handleSubmit = async (formData: Exercise) => {
    try {
      const data = await cadastroExercicioApi(formData);
      console.log("Cadastro bem-sucedido", data);
    } catch (error) {
      throw new Error('Erro ao cadastrar');
    }
  };

  return <ExerciseForm initialData={formExercicio} onSubmit={handleSubmit} isEditMode={false}/>
}