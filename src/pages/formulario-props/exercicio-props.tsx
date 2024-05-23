import { useState } from "react";
import { useNavigate } from "react-router";
import { Exercise } from "../../api/interface";
import Button from "../../components/button";
import buttonPadrao from "../../components/button/button-padrao";
import cardProps from "../../sharedProps/card";
import inputProps from "../../sharedProps/input";


interface ExercicioFormProps {
  initialData: Exercise;
  onSubmit: (data: Exercise) => Promise<void>;
  isEditMode?: boolean;
}

export function ExerciseForm({ initialData, onSubmit, isEditMode = false }: ExercicioFormProps) {
  const [formExercicio, setformExercicio] = useState<Exercise>(initialData);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const extractVideoId = (url: string) => {
    let videoId = "";
    if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/").pop() || "";
    }
    return videoId;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "file") {
      const videoId = extractVideoId(value);
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      setformExercicio({ ...formExercicio, [name]: embedUrl });
    } else {
      setformExercicio({ ...formExercicio, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await onSubmit(formExercicio);
      navigate('/relatorios-exercicios');
      alert('Exercício enviado com sucesso!');
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setError('Erro ao enviar formulário. Por favor, verifique suas informações.');
    }
  };

  return (
    <div className="bg-backgroundMain flex justify-center flex-col lg:flex-row">
    <form
      className="m-1 flex items-start justify-center lg:w-[49%] my-8"
      onSubmit={handleSubmit}
    >
      <div
        {...cardProps}
        className={`${cardProps.className} w-full max-w-[600px]`}
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Grupo do musculo *</span>
            </label>
            <select
              name="muscle_group"
              className="select w-full"
              value={formExercicio.muscle_group}
              onChange={handleChange}
            >
              <option>Escolha um grupo</option>
              <option value="superiores">superiores</option>
              <option value="inferiores">inferiores</option>
              <option value="aerobicos">aerobicos</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Musculo a ser trabalhado *</span>
            </label>
            <input
              type="text"
              placeholder="Digite musculo a ser trabalhado"
              name="muscle"
              value={formExercicio.muscle}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Dificuldade do exercicio*</span>
            </label>
            <select
              name="difficulty"
              className="select w-full"
              value={formExercicio.difficulty}
              onChange={handleChange}
            >
              <option>Escolha o nível de dificuldade</option>
              <option value={0.9}>Difícil</option>
              <option value={0.5}>Médio</option>
              <option value={0.1}>Fácil</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome do exercicio *</span>
            </label>
            <input
              type="text"
              placeholder="Digite nome do exercicio"
              name="name"
              value={formExercicio.name}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Repetições do exercicio *</span>
            </label>
            <input
              type="number"
              placeholder="Quantas repetições"
              name="reps"
              value={formExercicio.reps}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descrição do exercício *</span>
            </label>
            <input
              type="text"
              placeholder="Digite a descrição do exercício"
              name="description"
              value={formExercicio.description}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Link do YouTube *</span>
            </label>
            <input
              type="text"
              placeholder="Digite o link do YouTube do seu vídeo"
              name="file"
              value={formExercicio.file}
              onChange={handleChange}
              {...inputProps}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-control mt-6">
              <Button
                type="submit"
                {...buttonPadrao}
              >
                {isEditMode ? 'Editar' : 'Cadastrar'}
              </Button>
            </div>
        </div>
      </div>
    </form>
  </div>
  );
}
