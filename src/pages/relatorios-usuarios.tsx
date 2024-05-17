import { useEffect, useState } from "react";
import { listarTodosUsuarios, deletarUsuario, atualizarUsuario, listarUsuariosAdmin } from "../api/api-usuarios";
import { User } from "../api/interface";
import buttonAtualizarDeletar from "../components/button/button-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import table from "../components/table/table";
import divTable from "../components/table/div-table";
import inputTable from "../components/table/input";
import { useNavigate } from "react-router-dom";

function TableDadosUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(token);


  const estiloTh = { className: "border px-4 py-2"};
  const estiloTd = { classname: "border p-2" };
  const TableHeaderFooter = () => (
    
    <thead>
      <tr>
        <th {...estiloTh}>ID</th>
        <th {...estiloTh}>Nome</th>
        <th {...estiloTh}>Data de Nascimento</th>
        <th {...estiloTh}>Email</th>
        <th {...estiloTh}>Telefone</th>
        <th {...estiloTh}>Gênero</th>
        <th {...estiloTh}>Administrador</th>
        <th {...estiloTh}>Diagnóstico</th>
        <th {...estiloTh}>Lista de Exercícios</th>
        <th {...estiloTh}>Assinatura do EULA</th>
        <th {...estiloTh}>Ações</th>
        <th {...estiloTh}>ID</th>
      </tr>
    </thead>
  );

  const valorInput = (e: any) => {
    setValorAtualInput(e.target.value);
    const filteredUsers = users.filter(
      user =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setUsers(filteredUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = window.localStorage.getItem("user_toke");
      if (storedToken) {
        setToken(storedToken);
        try {
          const usersAdmin = await listarUsuariosAdmin();
          const allUsers = await listarTodosUsuarios();
          setUsers([...usersAdmin, ...allUsers]);
          
        } catch (error) {
          console.error('Erro ao obter usuários:', error);
          navigate('/escolher-exercicios');
        }
      } else {
        console.error('Token não encontrado');
        navigate('/escolher-exercicios');
      }
    };

    fetchData();
  }, []);

  const removeUser = async (user_id: string) => {
    try {
      await deletarUsuario(user_id);
      console.log("Usuário deletado");
      setUsers(users.filter(user => user.user_id !== user_id));
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  };

  const atualizarUser = (user_id: string) => {
    console.log({user_id})
    atualizarUsuario(user_id)
      .then(() => {
        console.log("Usuário atualizado");
        setUsers(users.map(user => user.user_id === user_id ? { ...user, } : user));
      })
      .catch((error) => console.error('Erro ao atualizar o usuário:', error));
  }

  return (
      <div className="h-screen overflow-hidden">
       <div className="m-2 flex justify-between items-stretch flex-col md:flex-row">
          <div className="flex items-center">
            <h1>Relatório de Usuários</h1>
          </div>
          <div>
            <label {...inputTable}>
              <input
                type="text"
                className="grow"
                value={valorAtualInput}
                onChange={valorInput}
                placeholder="Pesquisar"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
        <div {...divTable}>
          <table {...table}>
          <TableHeaderFooter />
            <tbody>
              {users.map((item, index) => (
                <tr key={index} className="text-center">
                  <td {...estiloTd}>{index + 1}</td>
                  <td {...estiloTd}>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img src={item.profile_pic} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td {...estiloTd}>{item.birth}</td>
                  <td {...estiloTd}>{item.email}</td>
                  <td {...estiloTd}>{item.phone}</td>
                  <td {...estiloTd}>{item.gender}</td>
                  <td {...estiloTd}>{item.admin === true ? "administrador" : "usuario"}</td>
                  <td {...estiloTd}>{item.diagnosis}</td>
                  <td {...estiloTd}>{item.exercise_list}</td>
                  <td {...estiloTd}>{item.signed_eula === true ? "Assinado" : "Não assinou"}</td>
                  <td {...estiloTd}>
                    <button
                      {...buttonAtualizarDeletar}
                      onClick={() => removeUser(item.user_id ?? '')}
                    >
                       <FaTrash className="w-6 h-4 m-1" />
                    </button>
                    <button
                      {...buttonAtualizarDeletar}
                      onClick={() => atualizarUser(item.user_id ?? '')}
                    >
                     <FaEdit className="w-6 h-4 m-1" />
                    </button>
                  </td>
                  <td {...estiloTh}>{index + 1}</td>
                </tr>
              ))}
            </tbody>
            <TableHeaderFooter />
          </table>
        </div>
      </div>
  );
}

export default TableDadosUsuarios;
