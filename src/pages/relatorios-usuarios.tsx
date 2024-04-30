import { useEffect, useState } from "react"
import { listarTodosUsuarios } from "../api/api";
import User from "../api/interface";

function TableDadosUsuarios(){
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listarTodosUsuarios()
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erro ao obter usuários:', error));
  }, []);
  console.log(users);

    return(
        <>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
            <thead>
                <tr>
                    <td>Nome</td>
                    <td>Data de Nascimento</td>
                    <td>Email</td>
                    <td>Telefone</td>
                    <td>Gênero</td>
                    <td>Administrador</td>
                    <td>Diagnóstico</td>
                    <td>Lista de Exercícios</td>
                    <td>Assinatura do EULA</td>
                    <td>Senha</td>
              </tr>
           </thead>
                    <tbody>
                        {
                            users.map((item, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
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
                                    <td>{item.birth}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.admin}</td>
                                    {/* <td>{getRoleComponent(l.role)}</td> */}
                                    <td>{item.diagnosis}</td>
                                    <td>{item.exercise_list}</td>
                                    <td>{item.signed_eula}</td>
                                    <td>{item.password}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default TableDadosUsuarios