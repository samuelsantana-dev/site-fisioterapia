import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../../api/interface";
import { atualizarExercicio } from "../../api/api-exercicios";
import axios from "axios";
import { ExerciseForm } from "../formulario-props/exercicio-props";

export function EditarExercicios() {
  const { id } = useParams();
  const [formExercicio, setformExercicio] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formExercicio: any) => {
    try {
      await atualizarExercicio(formExercicio);
      navigate("/escolher-exercicios");
    } catch (error) {
      console.error("Erro ao editar:", error);
      setError("Erro ao editar. Por favor, verifique suas informações.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/exercises/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-user-token': window.localStorage["user_token"]
            }
          }
        );
        setformExercicio(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!formExercicio) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return  <ExerciseForm initialData={formExercicio} onSubmit={handleSubmit} isEditMode/>
   
}
