import { useEffect, useState } from "react";
import { listarTodosUsuarios } from "../api/api";


 function TableUsuarios(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        listarTodosUsuarios()
            .then((data) => console.log(data))
            .catch((error) => console.error('nao conectou', error));
    }, []);

    // const getTableList = (onFinnaly?: () => void) => {
    //     listarTodosUsuarios({
    //       onSuccess: (data: any) => {
    //         console.log({ data })
    //         // setTableList(data);
    //       },
    //       onFinnaly: () => {
    //         onFinnaly && onFinnaly()
    //       }
    //     })
    //   }

    //   console.log(getTableList)

    return(
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
                    <td>Samuel</td>
                    <td>55555</td>
                    <td>Email@gmail.com</td>
                    <td>61991076</td>
                    <td>Masculino</td>
                    <td>Administrador</td>
                    <td>Foto de Perfil</td>
                    <td>teste</td>
                    <td>Lista de Exercícios - cancelar</td>
                    <td>Assinado</td>
                    <td>testes senha</td>
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

export default TableUsuarios