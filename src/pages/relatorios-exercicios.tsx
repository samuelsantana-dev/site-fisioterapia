import { useEffect, useState } from "react";
import { Exercise } from "../api/interface";
import { deletarExercicio, getExercicios } from "../api/api-exercicios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/seachbar";
import { Header } from "../components/header";
import { difficulty } from "../components/validacoes-gerais";

function TableDadosExercicios() {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [filteredExercicios, setFilteredExercicios] = useState<Exercise[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const navigate = useNavigate();
  const estiloTh = { className: "px-4 py-2 border" };
  const estiloTd = { className: "px-4 py-2 border" };

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
          const savedExerciciosConcluidos = JSON.parse(localStorage.getItem("exerciciosConcluidos") || "[]");
          const exerciciosMarcados = exerciciosAdmin.map((exercicio: Exercise) => ({
            ...exercicio,
            concluido: savedExerciciosConcluidos.includes(exercicio.exercise_id)
          }));
          setExercicios(exerciciosMarcados);
          setFilteredExercicios(exerciciosMarcados);
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

  const exportToCSV = () => {
    const csvData = filteredExercicios.map(item => ({
      ID: item.exercise_id,
      "Grupo do Músculo": item.muscle_group,
      Dificuldade: difficulty(item.difficulty),
      Músculo: item.muscle,
      Arquivo: item.file,
      Nome: item.name,
      Descrição: item.description
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "exercicios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <SearchInput
            label="Relatório de Exercícios"
            value={valorAtualInput}
            onChange={valorInput}
            placeholder="Pesquisar"
          />
          <button className="btn btn-primary" onClick={exportToCSV}>Exportar para CSV</button>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto table-xs table-pin-rows table-pin-cols">
            <table className="table w-full">
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
                  <tr key={index} className="hover">
                    <td {...estiloTd}>{index + 1}</td>
                    <td {...estiloTd}>{item.muscle_group}</td>
                    <td {...estiloTd}>{difficulty(item.difficulty)}</td>
                    <td {...estiloTd}>{item.muscle}</td>
                    <td {...estiloTd} className="text-blue-500">
                      <a href={item.file} target="_blank" rel="noopener noreferrer">
                        {item.file}
                      </a>
                    </td>
                    <td {...estiloTd}>{item.name}</td>
                    <td {...estiloTd}>{item.description}</td>
                    <td {...estiloTd}>
                      <button
                        className="btn btn-error btn-xs mr-2"
                        onClick={() => removeExercicio(item.exercise_id ?? "")}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="btn btn-warning btn-xs"
                        onClick={() => atualizarEx(item.exercise_id ?? "")}
                      >
                        <FaEdit />
                      </button>
                    </td>
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
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableDadosExercicios;
