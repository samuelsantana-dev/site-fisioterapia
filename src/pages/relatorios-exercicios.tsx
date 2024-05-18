import { useEffect, useState } from "react";
import { Exercise } from "../api/interface";
import { atualizarExercicio, deletarExercicio, getExercicios } from "../api/api-exercicios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import buttonAtualizarDeletar from "../components/button/button-table";
import table from "../components/table/table";
import divTable from "../components/table/div-table";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/seachbar";
import { Header } from "../components/header";

function TableDadosUsuarios() {
  const [exercicios, setExercies] = useState<Exercise[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate()
  console.log(token)

  const estiloTh = { className: "border px-4 py-2"};
  const estiloTd = { classname: "border p-2" };
  const valorInput = (e: any) => {
    setValorAtualInput(e.target.value);
    const filteredUsers = exercicios.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.muscle_group.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setExercies(filteredUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = window.localStorage.getItem("user_toke");
      if (storedToken) {
        setToken(storedToken);
        try {
          const exerciciesAdmin = await getExercicios();
          setExercies([...exerciciesAdmin]);
        } catch (error) {
          alert('Faça login para acessar essa pagina');
          console.error("Erro ao obter usuários:", error);
          navigate('/login');
        }
      } else {
        console.error('Token não encontrado');
        navigate('/login');
         }
      }

    fetchData();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
          const exerciciesAdmin = await getExercicios();
          setExercies([...exerciciesAdmin]);
        } catch (error) {
          console.error("Erro ao obter usuários:", error);
          // navigate('/escolher-exercicios');
        }
      
      }

    fetchData();
  }, []);

  const removeExercicie = async (exercise_id: string) => {
    try {
      await deletarExercicio(exercise_id);
      console.log("Exercício deletado");
      setExercies(exercicios.filter((ex) => ex.exercise_id === exercise_id));
    } catch (error) {
      console.error("Erro ao deletar o Exercício:", error);
    }
  };

  const atualizarEx = (exercise_id: string) => {
    atualizarExercicio(exercise_id)
      .then(() => {
        console.log("Usuário atualizado");
        setExercies(exercicios.map((user) => (user.exercise_id === exercise_id ? { ...user, } : user)));
      })
      .catch((error) => console.error("Erro ao atualizar o usuário:", error));
  };

  return (
    <>
    <Header />
    <div>
      <div>
            <SearchInput
              label="Relatório de Exercicios"
              value={valorAtualInput}
              onChange={valorInput} 
              placeholder="Pesquisar"      
            />
          </div>
      <div {...divTable}>
        <table {...table}>
        <thead>
          <tr>
              <th {...estiloTh}>ID</th>
              <th {...estiloTh}>Grupo do Músculo</th>
              <th {...estiloTh}>Dificuldade</th>
              <th {...estiloTh}>Músculo</th>
              <th {...estiloTh}>Arquivo</th>
              <th {...estiloTh}>Nome</th>
              <th {...estiloTh}>Descrição</th>
              <th {...estiloTh}>Ações</th>
              <th {...estiloTh}>ID</th>
          </tr>
         </thead>
          <tbody>
            {exercicios.map((item, index) => (
              <tr key={index} className="text-center">
                <td {...estiloTh}>{index + 1}</td>
                <td {...estiloTd}>{item.muscle_group}</td>
                <td {...estiloTd}>{item.difficulty}</td>
                <td {...estiloTd}>{item.muscle}</td>
                <td {...estiloTd}>{item.file}</td>
                <td {...estiloTd}>{item.name}</td>
                <td {...estiloTd}>{item.description}</td>
                <td {...estiloTd}>
                  <button
                    {...buttonAtualizarDeletar}
                    onClick={() => removeExercicie(item.exercise_id ?? '')}
                  >
                      <FaTrash className="w-6 h-4 m-1" />
                  </button>
                  <button
                    {...buttonAtualizarDeletar}
                    onClick={() => atualizarEx(item.exercise_id ?? '')}
                  >
                      <FaEdit className="w-6 h-4 m-1" />
                  </button>
                </td>
                <td {...estiloTh}>{index + 1}</td>
              </tr>
            ))}
          </tbody>
          <thead>
          <tr>
              <th {...estiloTh}>ID</th>
              <th {...estiloTh}>Grupo do Músculo</th>
              <th {...estiloTh}>Dificuldade</th>
              <th {...estiloTh}>Músculo</th>
              <th {...estiloTh}>Arquivo</th>
              <th {...estiloTh}>Nome</th>
              <th {...estiloTh}>Descrição</th>
              <th {...estiloTh}>Ações</th>
              <th {...estiloTh}>ID</th>
          </tr>
         </thead>
        </table>
       
      </div>
    </div>
    </>
  );
}

export default TableDadosUsuarios;
