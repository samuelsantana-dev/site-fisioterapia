import { useEffect, useState, useCallback } from "react";
import { Exercise } from "../../api/interface";
import { deletarExercicio, getExercicios } from "../../api/api-exercicios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/ui/seachbar";
import { difficulty } from "../../components/validacoes-gerais";

export function TableDadosExercicios() {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [filteredExercicios, setFilteredExercicios] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Estilos reutilizáveis
  const tableStyles = {
    header: "px-4 py-2 border bg-gray-100 font-semibold",
    cell: "px-4 py-2 border",
    actionButton: "btn btn-xs mr-2"
  };

  // Busca dados dos exercícios
  const fetchExercicios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const storedToken = localStorage.getItem("user_token");
      if (!storedToken) {
        throw new Error("Token não encontrado");
      }

      const exerciciosData = await getExercicios();
      const savedExerciciosConcluidos = JSON.parse(localStorage.getItem("exerciciosConcluidos") || "[]");
      
      const exerciciosMarcados = exerciciosData.map((exercicio: Exercise) => ({
        ...exercicio,
        concluido: savedExerciciosConcluidos.includes(exercicio.exercise_id)
      }));
      
      setExercicios(exerciciosMarcados);
      setFilteredExercicios(exerciciosMarcados);
    } catch (err) {
      console.error("Erro ao obter exercícios:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchExercicios();
  }, [fetchExercicios]);

  // Filtra exercícios baseado no termo de busca
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredExercicios(exercicios);
    } else {
      const filtered = exercicios.filter(exercicio =>
        Object.values(exercicio).some(
          value => typeof value === 'string' && 
                  value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredExercicios(filtered);
    }
  }, [searchTerm, exercicios]);

  // Remove exercício
  const handleRemoveExercicio = async (exerciseId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este exercício?")) return;
    
    try {
      await deletarExercicio(exerciseId);
      const updatedExercicios = exercicios.filter(ex => ex.exercise_id !== exerciseId);
      setExercicios(updatedExercicios);
      setFilteredExercicios(updatedExercicios);
    } catch (err) {
      console.error("Erro ao deletar exercício:", err);
      setError("Erro ao deletar exercício");
    }
  };

  // Navega para edição
  const handleEditExercicio = (exerciseId: string) => {
    navigate(`/editar-exercicio/${exerciseId}`);
  };

  // Exporta para CSV
  const handleExportToCSV = () => {
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
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "exercicios.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Renderiza linha da tabela
  const renderTableRow = (item: Exercise, index: number) => (
    <tr key={item.exercise_id} className="hover">
      <td className={tableStyles.cell}>{index + 1}</td>
      <td className={tableStyles.cell}>{item.muscle_group}</td>
      <td className={tableStyles.cell}>{difficulty(item.difficulty)}</td>
      <td className={tableStyles.cell}>{item.muscle}</td>
      <td className={tableStyles.cell}>
        {item.file && (
          <a 
            href={item.file} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Ver arquivo
          </a>
        )}
      </td>
      <td className={tableStyles.cell}>{item.name}</td>
      <td className={tableStyles.cell}>{item.description}</td>
      <td className={tableStyles.cell}>
        <div className="flex space-x-2">
          <button
            className={`${tableStyles.actionButton} btn-error`}
            onClick={() => handleRemoveExercicio(item.exercise_id ?? "")}
            aria-label="Excluir exercício"
          >
            <FaTrash />
          </button>
          <button
            className={`${tableStyles.actionButton} btn-warning`}
            onClick={() => handleEditExercicio(item.exercise_id ?? "")}
            aria-label="Editar exercício"
          >
            <FaEdit />
          </button>
        </div>
      </td>
    </tr>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm" onClick={fetchExercicios}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Relatório de Exercícios</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <SearchInput
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar exercícios..."
            className="flex-grow"
          />
          <button 
            className="btn btn-primary"
            onClick={handleExportToCSV}
            disabled={filteredExercicios.length === 0}
          >
            Exportar para CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th className={tableStyles.header}>ID</th>
              <th className={tableStyles.header}>Grupo Muscular</th>
              <th className={tableStyles.header}>Dificuldade</th>
              <th className={tableStyles.header}>Músculo</th>
              <th className={tableStyles.header}>Arquivo</th>
              <th className={tableStyles.header}>Nome</th>
              <th className={tableStyles.header}>Descrição</th>
              <th className={tableStyles.header}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercicios.length > 0 ? (
              filteredExercicios.map(renderTableRow)
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  {searchTerm ? "Nenhum exercício encontrado" : "Nenhum exercício disponível"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}