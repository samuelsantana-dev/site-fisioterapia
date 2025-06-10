import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizarExercicio, getExercicios} from "../../api/api-exercicios";
import { ExerciseForm } from "../formulario-props/exercicio-props";
import ErrorMessage from "../../components/ui/ErrorMessage";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Exercise } from "../../api/interface";

export function EditarExercicios() {
  const { id } = useParams<{ id: string }>();
  const [exercicio, setExercicio] = useState<Exercise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (formData: Exercise) => {
    try {
      if (!id) {
        throw new Error("ID do exercício não encontrado");
      }
      
      await atualizarExercicio(formData);
      navigate("/escolher-exercicios", { 
        state: { successMessage: "Exercício atualizado com sucesso!" } 
      });
    } catch (error) {
      console.error("Erro ao editar:", error);
      setError(error instanceof Error ? error.message : "Erro ao editar. Por favor, verifique suas informações.");
    }
  };

  useEffect(() => {
    const fetchExercicio = async () => {
      try {
        setIsLoading(true);
        if (!id) {
          throw new Error("ID do exercício não fornecido");
        }
        
        const response = await getExercicios()
        setExercicio(response.data);
      } catch (error) {
        console.error("Erro ao buscar exercício:", error);
        setError(error instanceof Error ? error.message : "Erro ao carregar exercício");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercicio();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (!exercicio) {
    return <ErrorMessage message="Exercício não encontrado" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Exercício</h1>
      <ExerciseForm 
        initialData={exercicio} 
        onSubmit={handleSubmit} 
        isEditMode 
      />
    </div>
  );
}