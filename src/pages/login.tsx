import { Link } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import buttonPadrao from '../components/button/button-padrao';
import { loginUser } from '../api/api';
import { useState } from 'react';
import inputProps from '../sharedProps/input';

export function LoginForm() {
  const [valueForm, setValueForm] = useState({
    email: '', 
    password: '' 
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValueForm({ ...valueForm, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    loginUser(e)
    .then((data) => console.log(data))
    console.log(valueForm);
  }

  return (
    <>
    <Header />
        <div className="hero min-h-screen bg-backgroundMain">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold">Entre agora!</h1>
            <p className="py-8 text-base">Descubra o conforto e o bem-estar que oferecemos. Estamos aqui para ajudá-lo a alcançar uma vida mais saudável e ativa. Entre em contato conosco e agende sua consulta hoje mesmo!</p>
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
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <Link to="/login" className="btn bg-backgroundButton">Login</Link>
                </div>
                <div className="form-control mt-6">
                  <Link to="/cadastro" {...buttonPadrao}>Cadastre-se</Link>
                </div>
              </form>
            </div>
          </div>
      </div>
    <Footer />
    </>
  );
}
