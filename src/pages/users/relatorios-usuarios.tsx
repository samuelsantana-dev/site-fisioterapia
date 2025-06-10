import { useEffect, useMemo, useState, ChangeEvent } from 'react';
import {
  listarTodosUsuarios,
  listarUsuariosAdmin,
  deletarUsuario,
} from '../../api/api-usuarios';
import { User } from '../../api/interface';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/ui/seachbar';

export default function TableDadosUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [admins, commons] = await Promise.all([
          listarUsuariosAdmin(),
          listarTodosUsuarios(),
        ]);
        setUsers([...admins, ...commons]);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        alert('Falha ao carregar usuários.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ---------- FILTRO MEMOIZADO ---------- */
  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return users;

    return users.filter(
      ({ name, email, gender }) =>
        name.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        gender.toLowerCase().includes(q),
    );
  }, [users, query]);

  /* ---------- HANDLERS ---------- */
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleDelete = async (user_id: string) => {
    if (!confirm('Tem certeza que deseja remover este usuário?')) return;
    try {
      await deletarUsuario(user_id);
      setUsers(prev => prev.filter(u => u.user_id !== user_id));
      alert('Usuário removido com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      alert('Erro ao deletar o usuário!');
    }
  };

  const handleUpdate = (user_id: string) => navigate(`/editar-usuario/${user_id}`);

  const handleExport = () => {
    const csvData = filteredUsers.map(u => ({
      ID: u.user_id,
      Nome: u.name,
      'Data de Nascimento': new Date(u.birth).toISOString().slice(0, 10),
      Email: u.email,
      Telefone: u.phone,
      Gênero: u.gender,
      Administrador: u.admin ? 'administrador' : 'usuario',
      Diagnóstico: u.diagnosis,
      'Lista de Exercícios': u.exercise_list,
      'Assinatura do EULA': u.signed_eula ? 'Assinada' : 'Não assinou',
    }));

    const blob = new Blob([Papa.unparse(csvData)], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'usuarios.csv';
    link.click();
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="container mx-auto p-4 100-vh">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <SearchInput
          label="Relatório de Usuários"
          value={query}
          onChange={handleSearch}
          placeholder="Pesquisar"
        />
        <button className="btn btn-primary" onClick={handleExport}>
          Exportar CSV
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-dots loading-lg" />
        </div>
      ) : (
        <div className="overflow-x-auto max-h-96">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Nascimento</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Gênero</th>
                <th>Admin</th>
                <th>Diagnóstico</th>
                <th>Exercícios</th>
                <th>EULA</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u, idx) => (
                <tr key={u.user_id} className="hover">
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle w-10 h-10">
                          <img
                            src={u.profile_pic || 'default_image.jpg'}
                            alt={`Avatar de ${u.name}`}
                          />
                        </div>
                      </div>
                      <span className="font-bold">{u.name}</span>
                    </div>
                  </td>
                  <td>{new Date(u.birth).toLocaleDateString()}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.gender}</td>
                  <td>{u.admin ? 'administrador' : 'usuario'}</td>
                  <td>{u.diagnosis}</td>
                  <td>{u.exercise_list}</td>
                  <td>{u.signed_eula ? 'Assinada' : 'Não assinou'}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(u.user_id ?? '')}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleUpdate(u.user_id ?? '')}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!filteredUsers.length && (
            <p className="text-center py-4">Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
