import { Link, useNavigate } from "react-router-dom";

export function Header({ isAdmin = false }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    window.localStorage.removeItem("user_toke");
    window.localStorage.removeItem("user_token");
    navigate('/login');
  };

  const isUserLoggedIn = window.localStorage.getItem("user_token");

  return (
    <div className="navbar bg-backgroundHeaderFooter">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">Fisioterapia</a>
      </div>
      <div className="flex justify-end flex-1 px-2 z-50">
        <div className="flex items-stretch">
          <Link 
            to="/" 
            className="btn btn-ghost rounded-btn"
          >
            Home
          </Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Opções</div>
            {isUserLoggedIn ? (
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                  <Link to="/escolher-exercicios">
                    Escolher Exercícios
                  </Link>
                </li>
                
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/termo-consenso">
                        Termo de Consentimento
                      </Link>
                    </li>
                    <li>
                      <Link to="/relatorios-usuario">
                        Relatório de Usuários
                      </Link>
                    </li>
                    <li>
                      <Link to="/relatorios-exercicios">
                        Relatório de Exercícios
                      </Link>
                    </li>
                  </>
                )}
                
                <li>
                  <button onClick={logoutUser} className="btn btn-ghost w-full text-left">
                    Sair
                  </button>
                </li>
              </ul>
            ) : (
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                  <Link to="/">Principal</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/cadastro">Cadastre-se</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}