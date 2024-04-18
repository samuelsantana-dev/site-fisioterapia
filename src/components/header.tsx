import { Link } from "react-router-dom";
import { headerEscolherExercicios, headerHome, headerLogin, headerTermoConcenso } from '../routes/links';

export function Header() {

  return (
      <div className="navbar bg-backgroundHeaderFooter">
          <div className="flex-1 px-2 lg:flex-none">
            <a className="text-lg font-bold">daisyUI</a>
          </div> 
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch">
           
            <Link 
              to={headerHome.href} 
              rel={headerHome.rel} 
              className="btn btn-ghost rounded-btn"
              >
                {headerHome.value}
             </Link>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Opçoes</div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                  <li>
                    <Link 
                      to={headerEscolherExercicios.href} 
                      rel={headerEscolherExercicios.rel}
                    >
                      {headerEscolherExercicios.value}
                    </Link>
                  </li> 
                  <li>
                  <Link 
                    to={headerTermoConcenso.href}
                    rel={headerTermoConcenso.rel} 
                    >
                    {headerTermoConcenso.value}
                  </Link>
                  </li>
                  <li>
                  <Link 
                    to={headerLogin.href} 
                    rel={headerLogin.rel} 
                  >
                    {headerLogin.value}
                  </Link>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </div>
  
  );
}