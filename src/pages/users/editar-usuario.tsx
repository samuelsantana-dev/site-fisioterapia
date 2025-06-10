import { useEffect, useState } from 'react';
import { atualizarUsuario } from '../../api/api-usuarios';
import { useParams } from 'react-router-dom';
import { UsuarioForm } from '../formulario-props/usuario-props';
import axios from 'axios';

export function EditarUsuario() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-user-token': window.localStorage["user_token"]
          }
        });
        setInitialData(response.data);
        console.log('Dados do usuário:', response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    try {
      await atualizarUsuario(formData);
      alert("Edição bem-sucedida");
      console.log("Edição bem-sucedida");
    } catch (error) {
      alert("Erro ao editar");
      throw new Error('Erro ao editar');
    }
  };

  if (!initialData) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return <UsuarioForm initialData={initialData} onSubmit={handleSubmit} isEditMode />;
}
