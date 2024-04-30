import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home.tsx';
import {LoginForm} from './pages/login.tsx';
import { ExerciciosInferiores } from './pages/exercicios-inferiores.tsx';
import { ExerciciosSuperiores } from './pages/exercicios-superiores.tsx';
import { EscolherExercicios } from './pages/escolher-exercicios.tsx';
import { CadastroForm } from './pages/cadastro.tsx';
import { TermoConcenso } from './pages/temoConcenso.tsx';
import TableDadosUsuarios from './pages/relatorios-usuarios.tsx';
import TableExercicios from './pages/relatorios-exercicios.tsx';
// import Root from './routes/routes.tsx';
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/cadastro",
    element: <CadastroForm />,
  },
  {
    path: "/termo-concenso",
    element: <TermoConcenso />,
  },
  {
    path: "/exercicios-inferiores",
    element: <ExerciciosInferiores />,
  },
  {
    path: "/exercicios-superiores",
    element: <ExerciciosSuperiores />,
  },
  {
    path: "/escolher-exercicios",
    element: <EscolherExercicios />,
  },
  {
    path: "/relatorios-usuario",
    element: <TableDadosUsuarios /> ,
  },
  {
    path: "/relatorios-exercicios",
    element: <TableExercicios />,
  }
 
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>,
)
