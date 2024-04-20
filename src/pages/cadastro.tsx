import { Header } from '../components/header';
import { Footer } from '../components/footer';
import cardProps from "../sharedProps/card"
import inputProps from "../sharedProps/input"
import Button from "../components/button"
import buttonPadrao from '../components/button/button-padrao';

export function CadastroForm() {
  return (
    <>
      <Header />
      <div className="bg-backgroundMain flex justify-center flex-col lg:flex-row">
        <form
          className="m-1 flex items-start justify-center lg:w-[49%] my-8"
          onSubmit={(e) => {
            e.preventDefault()
          }}
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
                  {...inputProps}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Data de Nascimento *</span>
                </label>
                <input
                  type="date"
                  name="birthdate"
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
                  name="cpf"
                  pattern="\d*"
                  placeholder="Digite seu CPF"
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
                  name="profile_image"
                  placeholder="Insira o URL da imagem de perfil"
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
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Endereço *</span>
                </label>
                <input
                  type="text"
                  maxLength={200}
                  name="address"
                  placeholder="Digite seu endereço"
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
