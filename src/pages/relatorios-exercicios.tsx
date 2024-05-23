import { useEffect, useState } from "react";
import { Exercise } from "../api/interface";
import { deletarExercicio, getExercicios } from "../api/api-exercicios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import buttonAtualizarDeletar from "../components/button/button-table";
import table from "../components/table/table";
import divTable from "../components/table/div-table";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/seachbar";
import { Header } from "../components/header";
import estiloTd from "../components/table/td";
import { difficulty } from "../components/validacoes-gerais";

function TableDadosUsuarios() {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [filteredExercicios, setFilteredExercicios] = useState<Exercise[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const navigate = useNavigate();
  const estiloTh = { className: "border px-4 py-2"};

  const valorInput = (e: any) => {
    const valor = e.target.value;
    setValorAtualInput(valor);
    if (valor === "") {
      setFilteredExercicios(exercicios);
    } else {
      const filteredUsers = exercicios.filter(
        (user) =>
          user.name.toLowerCase().includes(valor.toLowerCase()) ||
          user.muscle_group.toLowerCase().includes(valor.toLowerCase()) ||
          user.description.toLowerCase().includes(valor.toLowerCase()) 
      );
      setFilteredExercicios(filteredUsers);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = window.localStorage.getItem("user_token");
      if (storedToken) {
        try {
          const exerciciosAdmin = await getExercicios();
          setExercicios([...exerciciosAdmin]);
          setFilteredExercicios([...exerciciosAdmin]);
        } catch (error) {
          console.error("Erro ao obter exercícios:", error);
          alert('Faça login para acessar essa página');
          navigate('/login');
        }
      } else {
        console.error('Token não encontrado');
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const removeExercicio = async (exercise_id: string) => {
    try {
      await deletarExercicio(exercise_id);
      const updatedExercicios = exercicios.filter((ex) => ex.exercise_id !== exercise_id);
      setExercicios(updatedExercicios);
      setFilteredExercicios(updatedExercicios);
      alert('Exercício deletado com sucesso!');
    } catch (error) {
      alert('Erro ao deletar o Exercício!');
      console.error("Erro ao deletar o Exercício:", error);
    }
  };

  const atualizarEx = (exercise_id: string) => {
    navigate(`/editar-exercicio/${exercise_id}`);
  };

  return (
    <>
      <Header />
      <div>
        <div>
          <SearchInput
            label="Relatório de Exercícios"
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
              </tr>
            </thead>
            <tbody>
              {filteredExercicios.map((item, index) => (
                <tr key={index} className="text-center">
                  <td {...estiloTd}>{index + 1}</td>
                  <td {...estiloTd}>{item.muscle_group}</td>
                  <td {...estiloTd}>{difficulty(item.difficulty)}</td>
                  <td {...estiloTd}>{item.muscle}</td>
                  <td className="text-blue-500 border p-2">
                    <a href={item.file} target="_blank" rel="noopener noreferrer">
                      {item.file}
                    </a>
                  </td>
                  <td {...estiloTd}>{item.name}</td>
                  <td {...estiloTd}>{item.description}</td>
                  <td {...estiloTd}>
                    <button
                      {...buttonAtualizarDeletar}
                      onClick={() => removeExercicio(item.exercise_id ?? "")}
                    >
                      <FaTrash className="w-6 h-4 m-1" />
                    </button>
                    <button
                      {...buttonAtualizarDeletar}
                      onClick={() => atualizarEx(item.exercise_id ?? "")}
                    >
                      <FaEdit className="w-6 h-4 m-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableDadosUsuarios;
