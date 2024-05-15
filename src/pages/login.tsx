import { Link, useNavigate } from 'react-router-dom';
import buttonPadrao from '../components/button/button-padrao';
import { loginUser } from '../api/api';
import { useState } from 'react';
import inputProps from '../sharedProps/input';
import Button from '../components/button';

export function LoginForm() {
  const [valueForm, setValueForm] = useState({
    email: '',
    password: '', 
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValueForm({ ...valueForm, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await loginUser(valueForm);
      console.log("Login bem-sucedido:", data); 
      window.localStorage["user_toke"] = data.user_id;
      navigate('/escolher-exercicios');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const loginErros = () => {
    if(valueForm.email === '' || valueForm.password === '') {
      return alert("Preencha os campos corretamente")
    }
}

  return (
    <>
      <div className="hero min-h-screen bg-backgroundMain">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold">Entre agora!</h1>
            <p className="py-8 text-base">
              Descubra o conforto e o bem-estar que oferecemos. Estamos aqui
              para ajudá-lo a alcançar uma vida mais saudável e ativa. Entre
              em contato conosco e agende sua consulta hoje mesmo!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  maxLength={200}
                  placeholder="Digite seu e-mail"
                  onChange={handleChange}
                  value={valueForm.email}
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={valueForm.password}
                  onChange={handleChange}
                  {...inputProps}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <Button type="submit" onClick={loginErros} {...buttonPadrao}>
                  Login
                </Button>
              </div>
              <div className="form-control mt-6">
              <Link to="/cadastro" {...buttonPadrao}>
                Cadastre-se
              </Link>
            </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}
