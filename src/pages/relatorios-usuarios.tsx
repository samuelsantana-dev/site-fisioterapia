import React, { useEffect, useState } from "react";
import { listarTodosUsuarios, deletarUsuario, listarUsuariosAdmin } from "../api/api-usuarios";
import { User } from "../api/interface";
import { FaEdit, FaTrash } from "react-icons/fa";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/seachbar";
import { Header } from "../components/header";

function TableDadosUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const valorInput = (e: any) => {
    const valor = e.target.value;
    setValorAtualInput(valor);
    if (valor === "") { 
      setFilteredUsers(users);
    } else {
      const filteredUsers = users.filter(
        user =>
          user.name.toLowerCase().includes(valor.toLowerCase()) ||
          user.email.toLowerCase().includes(valor.toLowerCase()) ||
          user.gender.toLowerCase().includes(valor.toLowerCase())
      );
      setFilteredUsers(filteredUsers); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = window.localStorage.getItem("user_token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const usersAdmin = await listarUsuariosAdmin();
          const allUsers = await listarTodosUsuarios();
          const combinedUsers = [...usersAdmin, ...allUsers];
          setUsers(combinedUsers);
          setFilteredUsers(combinedUsers);
        } catch (error) {
          console.error('Erro ao obter usuários:', error);
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

  const removeUser = async (user_id: string) => {
    try {
      await deletarUsuario(user_id);
      const updatedUsers = users.filter(user => user.user_id !== user_id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      alert('Remoção Bem Sucedida!');
    } catch (error) {
      alert('Erro ao deletar o usuário!');
      console.error("Erro ao deletar o usuário:", error);
    }
  };

  const atualizarUser = (user_id: string) => {
    navigate(`/editar-usuario/${user_id}`);
    console.log(user_id);
  };

  const exportToCSV = () => {
    const csvData = filteredUsers.map(item => ({
      ID: item.user_id,
      Nome: item.name,
      "Data de Nascimento": new Date(item.birth).toISOString().slice(0, 10),
      Email: item.email,
      Telefone: item.phone,
      Gênero: item.gender,
      Administrador: item.admin ? "administrador" : "usuario",
      Diagnóstico: item.diagnosis,
      "Lista de Exercícios": item.exercise_list,
      "Assinatura do EULA": item.signed_eula ? "Assinado" : "Não assinou",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "usuarios.csv");
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
            label="Relatório de Usuários"
            value={valorAtualInput}
            onChange={valorInput}
            placeholder="Pesquisar"
          />
          <button className="btn btn-primary" onClick={exportToCSV}>Exportar para CSV</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Gênero</th>
                <th>Administrador</th>
                <th>Diagnóstico</th>
                <th>Lista de Exercícios</th>
                <th>Assinatura do EULA</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item, index) => (
                <tr key={index} className="hover">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img src={item.profile_pic || 'default_image.jpg'} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(item.birth).toISOString().slice(0, 10)}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.gender}</td>
                  <td>{item.admin ? "administrador" : "usuario"}</td>
                  <td>{item.diagnosis}</td>
                  <td>{item.exercise_list}</td>
                  <td>{item.signed_eula ? "Assinado" : "Não assinou"}</td>
                  <td>
                    <button
                      className="btn btn-error btn-xs mr-2"
                      onClick={() => removeUser(item.user_id ?? '')}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => atualizarUser(item.user_id ?? '')}
                    >
                      <FaEdit />
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
