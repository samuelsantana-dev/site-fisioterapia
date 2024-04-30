import { useEffect, useState } from "react";
import { listarTodosUsuarios } from "../api/api";
import User from "../api/interface";

function TableExercicios() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listarTodosUsuarios()
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erro ao obter usuários:', error));
  }, []);
  console.log(users);
  return (
    <section className="mx-auto bg-backgroundMain">
      <div>
         <h1>Relatório de Usuários</h1>
         <p>Relatorio de todos os usuarios</p>
      </div>
      <div className="overflow-x-auto min-h-screen flex items-center">
        <table className="bg-white table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Nome</td>
              <td>Data de Nascimento</td>
              <td>Email</td>
              <td>Telefone</td>
              <td>Gênero</td>
              <td>Administrador</td>
              <td>Foto de Perfil</td>
              <td>Diagnóstico</td>
              <td>Lista de Exercícios</td>
              <td>Assinatura do EULA</td>
              <td>Senha</td>
            </tr>
          </thead>
          <tbody>
          {
              users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.birth}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.gender}</td>
                  <td>{item.admin}</td>
                  <td>
                    <img src={`data:image/jpeg;base64, ${item.profile_pic}`} alt="Foto de Perfil" />
                  </td>
                  <td>{item.diagnosis}</td>
                  <td>{item.exercise_list}</td>
                  <td>{item.signed_eula}</td>
                  <td>{item.password}</td>
                </tr>
              ))
           }
          </tbody>
          <tfoot>
            <tr>
              <td>Nome</td>
              <td>Data de Nascimento</td>
              <td>Email</td>
              <td>Telefone</td>
              <td>Gênero</td>
              <td>Administrador</td>
              <td>Foto de Perfil</td>
              <td>Diagnóstico</td>
              <td>Lista de Exercícios</td>
              <td>Assinatura do EULA</td>
              <td>Senha</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default TableExercicios;
