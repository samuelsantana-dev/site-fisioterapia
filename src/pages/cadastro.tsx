import { Header } from '../components/header';
import { Footer } from '../components/footer';
import cardProps from "../sharedProps/card"
import inputProps from "../sharedProps/input"
import Button from "../components/button"
import buttonPadrao from '../components/button/button-padrao';
import { useState } from 'react';

export function CadastroForm() {

  const [formData, setFormData] = useState({
    "name": "",
    "birth": "",
    "email": "",
    "phone": "",
    "gender": "",
    "admin": false,
    "profile_pic": "",
    "diagnosis": "",
    "exercise_list": [
      ""
    ],
    "signed_eula": false,
    "password": ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      console.log('Usuário criado com sucesso:', await response.json());
      alert('Usuário criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Lidar com erros aqui
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <Header />
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
                  name="name"
                  maxLength={80}
                  placeholder="Digite seu nome"
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
                  type="date"
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
                  value={formData.email}
                  onChange={handleChange}
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
                  pattern="\d*"
                  placeholder="Digite seu Telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sexo *</span>
                </label>
                <input
                  type="text"
                  maxLength={80}
                  name="gender"
                  placeholder="Digite seu sexo"
                  value={formData.gender}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Imagem de perfil *</span>
                </label>
                <input
                  type="text"
                  maxLength={200}
                  name="profile_pic"
                  placeholder="Insira o URL da imagem de perfil"
                  value={formData.profile_pic}
                  onChange={handleChange}
                  {...inputProps}
                />
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
                  {...inputProps}
                  value={formData.diagnosis}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  {...inputProps}
                />
              </div>
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
      <Footer />
    </>
  );
}
