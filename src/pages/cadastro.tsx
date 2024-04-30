import { Header } from '../components/header';
import { Footer } from '../components/footer';
import cardProps from "../sharedProps/card"
import inputProps from "../sharedProps/input"
import Button from "../components/button"
import buttonPadrao from '../components/button/button-padrao';
import { useState } from 'react';
// import { cadastroUsuario } from '../api/api';
import User from '../api/interface';
import axios from 'axios';

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
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://app-jadson-back-wvjk3k2iaq-uc.a.run.app/api/v1/users/',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Resposta do servidor:', response.data);
      console.log(JSON.stringify(formData));
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-backgroundMain flex justify-center flex-col lg:flex-row">
        <form
          className="m-1 flex items-start justify-center lg:w-[49%] my-8"
          onSubmit={async (e) => await handleSubmit(e)}
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
                  type="text"
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
