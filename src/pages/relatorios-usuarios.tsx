import { useEffect, useState } from "react";
import TitleCard from "../components/titlecard";
import SearchBar from "../components/seachbar";
import { listarTodosUsuarios } from "../api/api";
import User from "../api/interface";
import { Header } from "../components/header";

function TopSideButtons({ removeFilter, applySearch }: any) {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={removeAppliedFilter}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
            Buscar
        </label>
      </div>
    </div>
  );
}

function TableDadosUsuarios() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    listarTodosUsuarios()
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erro ao obter usuários:', error));
  }, []);

  const removeFilter = () => setUsers(users);

  const applySearch = (value: string) => {
    const filtered = users.filter(
      (t) =>
        t.name.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <>
    <Header />

    <TitleCard
      className="min-h-screen w-full grid justify-items-center gap-2"
      title="Relatorio de Usuarios"
      TopSideButtons={
        <TopSideButtons
          applySearch={applySearch}
          removeFilter={removeFilter}
        />
      }
    >
      <div className="overflow-x-auto max-w-full m-2">
        <table className="table table-xs table-pin-rows table-pin-cols bg-white">
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
            </tr>
          </thead>
          <tbody>
            {users.map((item, k) => (
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
                <td className="px-6 py-4 whitespace-nowrap">{item.birth}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.gender}</td>
                <td>{item.admin}</td>
                <td>{item.diagnosis}</td>
                <td>{item.exercise_list}</td>
                <td>{item.signed_eula ? "Assinado" : "Não"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </TitleCard>
    </>
  );
}

export default TableDadosUsuarios;
