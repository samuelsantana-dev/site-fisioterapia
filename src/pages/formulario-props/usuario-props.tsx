import { useState } from "react";
import { useNavigate } from "react-router";
import { User, UserEdit } from "../../api/interface";
import Button from "../../components/button";
import buttonPadrao from "../../components/button/button-padrao";
import cardProps from "../../sharedProps/card";
import inputProps from "../../sharedProps/input";
import inputPropsPassword from "../../sharedProps/input-senha"


interface UsuarioFormProps {
  initialData: User | UserEdit;
  onSubmit: (data: User | UserEdit) => Promise<void>;
  isEditMode?: boolean;
}

export function UsuarioForm({ initialData, onSubmit, isEditMode = false }: UsuarioFormProps) {
  const [formData, setFormData] = useState<User | UserEdit>(initialData);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isUserLoggedIn = window.localStorage.getItem("user_token");

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const imageDataUrl = reader.result instanceof ArrayBuffer ? Buffer.from(reader.result).toString('base64') : null;
  //     setFormData({ ...formData, profile_pic: imageDataUrl });
  //   };
  //   if (file) {
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBox = (event: any) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      navigate('/escolher-exercicios');
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setError('Erro ao enviar formulário. Por favor, verifique suas informações.');
    }
  };

  return (
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
                placeholder='Digite seu nome completo'
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
                type="text"
                placeholder='Ano-Mês-Dia Ex: 2000-12-20'
                name="birth"
                minLength={10}
                maxLength={10}
                value={formData.birth}
                onChange={handleChange}
                {...inputProps}
              />
              <span id="dateHelp" className="text-gray-500">
                 Ano-Mês-Dia Ex: 2000-12-20
              </span>
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
              <label className="label" htmlFor="phone">
                <span className="label-text">Número de Telefone *</span>
              </label>
              <input
                type="text"
                id="phone"
                maxLength={11}
                minLength={11}
                name="phone"
                placeholder="11987654321"
                onChange={handleChange}
                value={formData.phone}
                aria-describedby="phoneHelp"
                {...inputProps}
              />
              <span id="phoneHelp" className="text-gray-500">
                Digite seu telefone com DDD, sem espaços ou traços. Ex: 11987654321
              </span>
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
            {isUserLoggedIn ? (
              <div className="form-control">
              <label className="label">
                <span className="label-text">Senha{isEditMode ? '' : ' *'}</span>
              </label>
              <input
                type="password"
                maxLength={200}
                name="password"
                placeholder="Digite uma senha segura"
                onChange={handleChange}
                value={formData.password}
                {...inputPropsPassword}
              />
            </div>
            ) : 
            (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Senha{isEditMode ? '' : ' *'}</span>
                </label>
                <input
                  type="password"
                  maxLength={200}
                  name="password"
                  placeholder="Digite uma senha segura"
                  onChange={handleChange}
                  value={formData.password}
                  {...inputProps}
                />
              </div>
            )}
            
            {isUserLoggedIn && (
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Você é um administrador?</span>
                  <input
                    type="checkbox"
                    name="admin"
                    className="checkbox checkbox-info"
                    checked={formData.admin}
                    onChange={handleCheckBox}
                  />
                </label>
              </div>
            )}
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Aceito o Termo *</span>
                <input
                  type="checkbox"
                  name="signed_eula"
                  className="checkbox checkbox-info"
                  checked={formData.signed_eula}
                  onChange={handleCheckBox}
                />
              </label>
              <div className="mt-2">
                <p>
                  Apresentamos o seu site de fisioterapia como um 'Portal de Estudos em Fisioterapia', oferecendo uma plataforma educativa com artigos, estudos de caso e insights sobre a prática da fisioterapia. Por favor, esteja ciente de que o site é estritamente para fins educacionais e informativos. Não garantimos a precisão das informações e o usuário assume a responsabilidade por qualquer aplicação prática de técnicas ou exercícios apresentados. Recomendamos consultar um profissional de saúde em caso de lesão ou desconforto. Ao continuar a usar o site, você aceita esta cláusula de responsabilidade.
                </p>
              </div>
              {!formData.signed_eula && <span className="text-red-500">Aceitação do termo é obrigatória</span>}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control mt-6">
              <Button
                type="submit"
                {...buttonPadrao}
              >
                {isEditMode ? 'Editar' : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
