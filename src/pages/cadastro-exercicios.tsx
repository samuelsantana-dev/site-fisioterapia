import cardProps from "../sharedProps/card"
import inputProps from "../sharedProps/input"
import Button from "../components/button"
import buttonPadrao from '../components/button/button-padrao';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Exercise} from '../api/interface';
import { cadastroExercicioApi } from '../api/api-exercicios';

export function CadastroExercicios() {
  const [formExercicio, setformExercicio] = useState<Exercise>({
    muscle_group: "",
    muscle: "",
    difficulty: 0,
    name: "",
    reps: 0,
    description: "",
    instructions: [],
    file: ""
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformExercicio({ ...formExercicio, [name]: value });
  };


  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      if(formExercicio.description.length <= 500){
        alert("A descrição do exercício deve ter pelo menos 500 caracteres.")
        return;
      }
      const data = await cadastroExercicioApi(formExercicio);
      console.log("Cadastro bem-sucedido:", data);
        navigate('/escolher-exercicios');
    } catch {
      console.error("Erro ao cadastrar:", error);
      setError('Erro ao cadastrar. Por favor, verifique suas informações.');
    }
   
  };

  return (
    <>
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
                 name='muscle_group'
                 className="select w-full"
                 value={formExercicio.muscle_group}
                 onChange={handleChange}
              >
                <option disabled selected>Escolha um grupo</option>
                <option value='superiores'>superiores</option>
                <option value='inferiores'>inferiores</option>
                <option value='aerobicos'>aerobicos</option>
              </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Musculo a ser trabalhado *</span>
                </label>
                <input
                  type="text"
                  placeholder='Digite musculo a ser trabalhado'
                  name="muscle"
                  value={formExercicio.muscle}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Dificuldade do exercicio *</span>
                </label>
                <input
                  type="text"
                  placeholder='Nivel de dificuldade'
                  name="difficulty"
                  value={formExercicio.difficulty}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome do exercicio *</span>
                </label>
                <input
                  type="text"
                  placeholder='Digite nome do exercicio'
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
                  placeholder='Quantas repetições'
                  name="reps"
                  value={formExercicio.reps}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">descrição do exercício *</span>
                </label>
                <input
                  type="text"
                  placeholder='Digite a descrição do exercício'
                  name="description"
                  value={formExercicio.description}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Link do you tube *</span>
                </label>
                <input
                  type="text"
                  placeholder='Digite o link do you Tube do seu video'
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
                  Cadastrar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}