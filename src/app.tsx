import { createBrowserRouter, Navigate, Route, Routes, useRoutes } from 'react-router-dom';
import { Home } from './pages/home.tsx';
import { LoginForm } from './pages/login.tsx';
import { ExerciciosInferiores } from './pages/exercicios-inferiores.tsx';
import { ExerciciosSuperiores } from './pages/exercicios-superiores.tsx';
import { EscolherExercicios } from './pages/escolher-exercicios.tsx';
import { CadastroForm } from './pages/cadastro.tsx';
import { CadastroExercicios } from './pages/cadastro-exercicios.tsx';
import TableDadosUsuarios from './pages/relatorios-usuarios.tsx';
import TableExercicios from './pages/relatorios-exercicios.tsx';
import Layout from './layout.tsx';
import { AuthProvider } from './hook/use-auth.tsx';
import { ProtectedRoute } from './hook/protect-route.tsx';


export function Rotas(){
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/secret"
          element={
            <ProtectedRoute>
              <CadastroExercicios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
}

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
    path: "/cadastro-exercicios",
    element: <Layout><CadastroExercicios /></Layout>,
  },
  {
    path: "/exercicios-inferiores",
    element: <Layout><ExerciciosInferiores /></Layout>,
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
    element: <Layout><TableDadosUsuarios /></Layout>,
  },
  {
    path: "/relatorios-exercicios",
    element: <Layout><TableExercicios /></Layout>,
  }
]);


export default router


 