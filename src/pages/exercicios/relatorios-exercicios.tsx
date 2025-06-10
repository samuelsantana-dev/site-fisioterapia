import { useEffect, useState, useCallback } from "react";
import { Exercise } from "../../api/interface";
import { deletarExercicio, getExercicios } from "../../api/api-exercicios";
import { FaTrash, FaEdit, FaFileExport, FaSearch, FaSync } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import { difficulty } from "../../components/validacoes-gerais";
import  LoadingSpinner  from "../../components/ui/ErrorMessage";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { SearchInput } from "../../components/ui/SearchInput";
import { ConfirmationModal } from "../../components/ui/ConfirmationModal";
import { Pagination } from "../../components/ui/Pagination";
import { Tooltip } from "../../components/ui/Tooltip";
import { EmptyState } from "../../components/ui/EmptyState";

const ITEMS_PER_PAGE = 10;

export function TableDadosExercicios() {
  const [exercicios, setExercicios] = useState<Exercise[]>([]);
  const [filteredExercicios, setFilteredExercicios] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const navigate = useNavigate();

  // Busca dados dos exercícios
  const fetchExercicios = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const exerciciosData = await getExercicios();
      setExercicios(exerciciosData);
      setFilteredExercicios(exerciciosData);
      setCurrentPage(1); // Reset pagination on new data
    } catch (err) {
      console.error("Erro ao obter exercícios:", err);
      setError(err instanceof Error ? err.message : "Erro ao carregar exercícios");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          value => value && 
                  value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setFilteredExercicios(filtered);
    }
    setCurrentPage(1); // Reset pagination on search
  }, [searchTerm, exercicios]);

  // Pagination logic
  const totalPages = Math.ceil(filteredExercicios.length / ITEMS_PER_PAGE);
  const paginatedExercicios = filteredExercicios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Remove exercício
  const handleRemoveExercicio = async () => {
    if (!selectedExercise) return;
    
    try {
      await deletarExercicio(selectedExercise);
      const updatedExercicios = exercicios.filter(ex => ex.exercise_id !== selectedExercise);
      setExercicios(updatedExercicios);
      setFilteredExercicios(updatedExercicios);
      setShowDeleteModal(false);
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
      "Grupo Muscular": item.muscle_group,
      Dificuldade: difficulty(item.difficulty),
      Músculo: item.muscle,
      Nome: item.name,
      Descrição: item.description,
      Arquivo: item.file
    }));
    
    const csv = Papa.unparse(csvData, {
      quotes: true,
      delimiter: ";",
      header: true
    });
    
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `exercicios_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  type Column = {
    key: keyof Exercise;
    header: string;
    width: string;
    render?: (value: any) => React.ReactNode;
  };

  const columns: Column[] = [
    { key: "muscle_group", header: "Grupo Muscular", width: "w-1/6" },
    { key: "difficulty", header: "Dificuldade", width: "w-1/6", 
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value <= 3 ? 'bg-green-100 text-green-800' : 
          value <= 6 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {difficulty(value)}
        </span>
      )
    },
    { key: "muscle", header: "Músculo", width: "w-1/6" },
    { key: "name", header: "Nome", width: "w-1/6" },
    { key: "description", header: "Descrição", width: "w-1/3", 
      render: (value: string) => <span className="line-clamp-2">{value}</span> 
    },
    { key: "file", header: "Arquivo", width: "w-1/6",
      render: (value: string) => value ? (
        <Tooltip content="Abrir arquivo">
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <FiAlertCircle className="inline mr-1" />
            Visualizar
          </a>
        </Tooltip>
      ) : "-"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingSpinner message="Nenhum exercicio encontrado" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage 
          message={error} 
          onRetry={fetchExercicios}
          className="max-w-2xl mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Exercícios</h1>
              <p className="text-sm text-gray-500">
                {filteredExercicios.length} exercício{filteredExercicios.length !== 1 ? 's' : ''} encontrado{filteredExercicios.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar exercícios..."
                icon={<FaSearch className="text-gray-400" />}
                className="w-full md:w-64"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={fetchExercicios}
                  className="btn btn-outline btn-sm"
                  aria-label="Recarregar"
                >
                  <FaSync className="mr-1" />
                  Atualizar
                </button>
                
                <button 
                  onClick={handleExportToCSV}
                  disabled={filteredExercicios.length === 0}
                  className="btn btn-primary btn-sm"
                >
                  <FaFileExport className="mr-1" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {filteredExercicios.length > 0 ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <th 
                        key={column.key}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width}`}
                      >
                        {column.header}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedExercicios.map((item) => (
                    <tr key={item.exercise_id} className="hover:bg-gray-50 transition-colors">
                      {columns.map((column) => (
                        <td 
                          key={`${item.exercise_id}-${column.key}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                        >
                          {column.render 
                            ? column.render(item[column.key as keyof Exercise] ?? "") 
                            : item[column.key as keyof Exercise] || "-"}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Tooltip content="Editar">
                            <button
                              onClick={() => handleEditExercicio(item.exercise_id ?? "")}
                              className="text-blue-500 hover:text-blue-700 transition-colors p-1 rounded"
                              aria-label="Editar exercício"
                            >
                              <FaEdit />
                            </button>
                          </Tooltip>
                          <Tooltip content="Excluir">
                            <button
                              onClick={() => {
                                setSelectedExercise(item.exercise_id ?? null);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-700 transition-colors p-1 rounded"
                              aria-label="Excluir exercício"
                            >
                              <FaTrash />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="justify-end"
                />
              </div>
            </>
          ) : (
            <EmptyState
              title={searchTerm ? "Nenhum exercício encontrado" : "Nenhum exercício cadastrado"}
              description={searchTerm ? "Tente ajustar sua busca" : "Adicione um novo exercício para começar"}
              icon={<FiAlertCircle size={48} className="text-gray-400" />}
              action={
                searchTerm ? (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="btn btn-outline btn-sm"
                  >
                    Limpar busca
                  </button>
                ) : (
                  <button 
                    onClick={fetchExercicios}
                    className="btn btn-primary btn-sm"
                  >
                    Recarregar
                  </button>
                )
              }
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveExercicio}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este exercício? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
}