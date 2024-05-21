import { useEffect, useState } from "react";
import { listarTodosUsuarios, deletarUsuario, atualizarUsuario, listarUsuariosAdmin } from "../api/api-usuarios";
import { User } from "../api/interface";
import buttonAtualizarDeletar from "../components/button/button-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import table from "../components/table/table";
import divTable from "../components/table/div-table";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/seachbar";
import { Header } from "../components/header";
import estiloTd from "../components/table/td";
import estiloTh from "../components/table/th";

function TableDadosUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [valorAtualInput, setValorAtualInput] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(token);

  const valorInput = (e: any) => {
    setValorAtualInput(e.target.value);
    const filteredUsers = users.filter(
      user =>
        user.name.toLowerCase().includes(e.target.value) ||
        user.email.toLowerCase().includes(e.target.value)
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
          navigate('/login');
        }
      } else {
        console.error('Token não encontrado');
        navigate('/login');
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
    <>
    <Header/>
      <div>
         <div >
            <SearchInput
              label="Relatório de Usuários"
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
                  <td {...estiloTd}>{new Date(item.birth).toISOString().slice(0,10)}</td>
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
                  <td {...estiloTd}>{index + 1}</td>
                </tr>
              ))}
            </tbody>
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
          </table>
        </div>
      </div>
    </>
  );
}

export default TableDadosUsuarios;
