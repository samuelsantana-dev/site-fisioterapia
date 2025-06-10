import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser } from '../../api/api-usuarios';
import  Button  from '../../components/button';
import { Input } from '../../components/input/input';

export function LoginForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    setIsUserLoggedIn(!!userToken);
    if (userToken) {
      navigate('/escolher-exercicios');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setError(null); // Limpa erros ao digitar
  };

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formValues.email || !formValues.password) {
      setError('Preencha todos os campos.');
      return false;
    }
  
    if (!emailRegex.test(formValues.email)) {
      setError('Digite um e-mail válido.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      const data = await loginUser(formValues);
      
      localStorage.setItem("user_token", data.user_id);
      setIsUserLoggedIn(true);
      navigate('/escolher-exercicios');
      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoggedIn) {
    return null; // Ou redireciona automaticamente pelo useEffect
  }

  return (
    <div className="hero min-h-screen bg-backgroundMain">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold leading-tight">
            Bem-vindo de volta!
          </h1>
          <p className="py-6 text-lg">
            Acesse sua conta para continuar sua jornada de bem-estar. 
            Oferecemos exercícios personalizados para ajudar você a alcançar 
            seus objetivos de saúde.
          </p>
          <div className="hidden lg:block">
            <div className="stats shadow bg-primary bg-opacity-10">
              <div className="stat">
                <div className="stat-title">Exercícios disponíveis</div>
                <div className="stat-value text-primary">50+</div>
                <div className="stat-desc">Para todas as necessidades</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
          <div className="card-body p-8">
            <h2 className="card-title text-2xl mb-6">Faça seu login</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">E-mail</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Senha</span>
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
                <label className="label">
                  <Link to="/recuperar-senha" className="label-text-alt link link-hover">
                    Esqueceu a senha?
                  </Link>
                </label>
              </div>
              
              {error && (
                <div className="alert alert-error p-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="form-control mt-6">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : 'Entrar'}
                </Button>
              </div>
            </form>
            
            <div className="divider my-6">OU</div>
            
            <div className="text-center">
              <p className="text-sm mb-4">Não tem uma conta?</p>
              <Link to="/cadastro" className="btn btn-outline w-full">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}