import { createBrowserRouter} from 'react-router-dom';
import { Home } from './pages/home.tsx';
import { LoginForm } from './pages/login.tsx';
import { ExerciciosInferiores } from './pages/exercicios/exercicios-inferiores.tsx';
import { ExerciciosSuperiores } from './pages/exercicios/exercicios-superiores.tsx';
import { EscolherExercicios } from './pages/escolher-exercicios.tsx';
import { CadastroForm } from './pages/cadastros/cadastro-usuario.tsx';
import { CadastroExercicios } from './pages/cadastros/cadastro-exercicios.tsx';
import TableDadosUsuarios from './pages/relatorios-usuarios.tsx';
import TableExercicios from './pages/relatorios-exercicios.tsx';
import Layout from './layout.tsx';
import {EditarUsuario} from './pages/cadastros/editar-usuario.tsx';
import { EditarExercicios } from './pages/cadastros/editar-exercicio.tsx';
import { ExerciciosAerobicos } from './pages/exercicios/exercicios-aerobicos.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><LoginForm /></Layout>,
  },  
  {
    path: "/cadastro",
    element: <Layout><CadastroForm /></Layout>,
  },
  {
    path: "/editar-usuario/:id",
    element: <Layout><EditarUsuario /></Layout>,
  },
  {
    path: "/editar-exercicio/:id",
    element: <Layout><EditarExercicios /></Layout>,
  },
  {
    path: "/cadastro-exercicios",
    element: <Layout><CadastroExercicios /></Layout>,
  },
  {
    path: "/exercicios-inferiores",
    element: <Layout><ExerciciosInferiores /></Layout>,
  },
  {
    path: "/exercicios-aerobicos",
    element: <Layout><ExerciciosAerobicos /></Layout>,
  },
  {
    path: "/exercicios-superiores",
    element: <Layout><ExerciciosSuperiores /></Layout>,
  },
  {
    path: "/escolher-exercicios",
    element: <Layout><EscolherExercicios /></Layout>,
  },
  {
    path: "/relatorios-usuario",
    element: <TableDadosUsuarios />,
  },
  {
    path: "/relatorios-exercicios",
    element: <TableExercicios />,
  }
]);


export default router


 