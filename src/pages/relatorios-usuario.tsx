import { useEffect, useState } from "react";
import { listarTodosUsuarios } from "../api/api";

interface User {
  id: string;
  name: string;
  birth: string;
  email: string;
  phone: string;
  gender: string;
  admin: boolean;
  profile_pic: string;
  diagnosis: string;
  exercise_list: string[];
  signed_eula: boolean;
  password: string;
}

function TableUsuarios() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listarTodosUsuarios()
      .then((data) => {
        const users: User[] = data.map((item: User) => ({
          id: item.id,
          name: item.name,
          birth: item.birth,
          email: item.email,
          phone: item.phone,
          gender: item.gender,
          admin: item.admin,
          profile_pic: item.profile_pic,
          diagnosis: item.diagnosis,
          exercise_list: item.exercise_list,
          signed_eula: item.signed_eula,
          password: item.password
        }));
        setUsers(users);
      })
      .catch((error) => console.error('Erro ao obter usuários:', error));
  }, []);

  const renderList = (data: User[]) => {
    return (
      <>
        {data.map((item) => {
          const {
            id,
            name,
            birth,
            email,
            phone,
            gender,
            admin,
            profile_pic,
            diagnosis,
            exercise_list,
            signed_eula,
            password
          } = item;
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{birth}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{gender}</td>
              <td>{admin ? true : false}</td>
              <td>{profile_pic}</td>
              <td>{diagnosis}</td>
              <td>
                <ul>
                  {exercise_list.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </td>
              <td>{signed_eula ? true : false}</td>
              <td>{password}</td>
            </tr>
          )
        })}
      </>
    )
  }

  return (
    <section className="mx-auto bg-backgroundMain">
      <div className="overflow-x-auto min-h-screen flex items-center">
        <table className="bg-white table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>nome</th>
              {renderList(users)}
              <th>1</th>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
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
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default TableUsuarios;
