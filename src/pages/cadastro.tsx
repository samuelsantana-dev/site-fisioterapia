import cardProps from "../sharedProps/card"
import inputProps from "../sharedProps/input"
import Button from "../components/button"
import buttonPadrao from '../components/button/button-padrao';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {User} from '../api/interface';
import { cadastroUsuario } from '../api/api-usuarios';

export function CadastroForm() {
  const [formData, setFormData] = useState<User>({
    id: '', 
    name: '', 
    birth: '', 
    email: '', 
    phone: '', 
    gender: '', 
    admin: false,
    diagnosis: '', 
    exercise_list: [], 
    signed_eula: false,
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBox = (event: any) => {
    const { name, checked} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      admin: true,
      signed_eula: true,
      [name]: checked,
    }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const data = await cadastroUsuario(formData);
      console.log("Cadastro bem-sucedido:", data);
      navigate('/escolher-exercicios');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError('Erro ao cadastrar. Por favor, verifique suas informações.');
    }
  };

  return (
    <>
      <div className="bg-backgroundMain flex justify-center flex-col lg:flex-row">
        <form
          className="m-1 flex items-start justify-center lg:w-[49%] my-8"
          onSubmit={handleSubmit}
        >
          <div
            {...cardProps}
            className={`${cardProps.className} w-full max-w-[600px]`}
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome *</span>
                </label>
                <input
                  type="text"
                  placeholder='Digite seu nome'
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Data de Nascimento *</span>
                </label>
                <input
                  type="number"
                  placeholder='ano-mes-dia ex: 2024-15-12'
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email *</span>
                </label>
                <input
                  type="email"
                  name="email"
                  maxLength={200}
                  placeholder="Digite seu e-mail"
                  onChange={handleChange}
                  value={formData.email}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Número *</span>
                </label>
                <input
                  type="text"
                  maxLength={11}
                  minLength={11}
                  name="phone"
                  placeholder="Digite seu Telefone"
                  onChange={handleChange}
                  value={formData.phone}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sexo *</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  {...inputProps}
                >
                  <option value="">Selecione seu sexo</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Diagnóstico *</span>
                </label>
                <input
                  type="text"
                  maxLength={80}
                  name="diagnosis"
                  placeholder="Digite seu diagnóstico"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Senha *</span>
                </label>
                <input
                  type="password"
                  maxLength={200}
                  name="password"
                  placeholder="Digite sua senha"
                  onChange={handleChange}
                  value={formData.password}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Voce é um administrador ?</span>
                  <input 
                    type="checkbox" 
                    name="admin" 
                    className="checkbox checkbox-info" 
                    checked={formData.admin}
                    onChange={handleCheckBox} 
                   />
                </label>
              </div>
              <div className="form-control">
                
                <label className="cursor-pointer label">
                  
                  <span className="label-text">Aceito o Termo</span>
                  <input 
                    type="checkbox" 
                    name="signed_eula" 
                    className="checkbox checkbox-info" 
                    checked={formData.signed_eula}
                    onChange={handleCheckBox} 
                   />
                </label>
                <div>
                    Apresentamos o seu site de fisioterapia como um 'Portal de Estudos em Fisioterapia', oferecendo uma plataforma educativa com artigos, estudos de caso e insights sobre a prática da fisioterapia. Por favor, esteja ciente de que o site é estritamente para fins educacionais e informativos. Não garantimos a precisão das informações e o usuário assume a responsabilidade por qualquer aplicação prática de técnicas ou exercícios apresentados. Recomendamos consultar um profissional de saúde em caso de lesão ou desconforto. Ao continuar a usar o site, você aceita esta cláusula de responsabilidade.
                  </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="form-control mt-6">
                <Button
                  type="submit"
                  {...buttonPadrao}
                >
                  Cadastrar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}