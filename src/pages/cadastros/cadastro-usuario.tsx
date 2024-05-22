import { useNavigate } from "react-router-dom";
import { cadastroUsuario } from "../../api/api-usuarios";
import { UsuarioForm } from "../formulario-props/usuario-props";


export function CadastroForm() {
  const initialData = {
    id: '', 
    name: '', 
    birth: '', 
    email: '', 
    phone: '', 
    gender: '', 
    admin: false,
    profile_pic: '',
    diagnosis: '', 
    exercise_list: [], 
    signed_eula: false,
    password: '' 
  };
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      const data = await cadastroUsuario(formData);
      window.localStorage["user_token"] = data.user_id;
      navigate('/escolher-exercicios');
      window.location.reload();
      console.log("Cadastro bem-sucedido");
    } catch (error) {
      throw new Error('Erro ao cadastrar');
    }
  };

  return <UsuarioForm initialData={initialData} onSubmit={handleSubmit} />;
}
