import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home.tsx';
import { LoginForm } from './pages/login.tsx';
import { ExerciciosInferiores } from './pages/exercicios/exercicios-inferiores.tsx';
import { ExerciciosSuperiores } from './pages/exercicios/exercicios-superiores.tsx';
import { EscolherExercicios } from './pages/escolher-exercicios.tsx';
import { CadastroForm } from './pages/cadastros/cadastro-usuario.tsx';
import { CadastroExercicios } from './pages/cadastros/cadastro-exercicios.tsx';
import TableDadosUsuarios from './pages/relatorios-usuarios.tsx';
import TableExercicios from './pages/relatorios-exercicios.tsx';
import { EditarUsuario } from './pages/cadastros/editar-usuario.tsx';
import { EditarExercicios } from './pages/cadastros/editar-exercicio.tsx';
import { ExerciciosAerobicos } from './pages/exercicios/exercicios-aerobicos.tsx';
import { Header } from './components/header.tsx';
import NotFound from './pages/not-found/not-found.tsx';
import { Footer } from './components/footer.tsx';

function App() {

    const isUserLoggedIn = window.localStorage.getItem("user_token");

    return (
        <div className="App">
            <BrowserRouter>
                    <Header />
                <Routes>
                    {isUserLoggedIn && (
                        <>
                            <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
                            <Route path="/editar-exercicio/:id" element={<EditarExercicios />} />
                            <Route path="/cadastro-exercicios" element={<CadastroExercicios />} />
                            <Route path="/relatorios-usuario" element={<TableDadosUsuarios />} />
                           <Route path="/relatorios-exercicios" element={<TableExercicios />} />
                        </>
                    )}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/cadastro" element={<CadastroForm />} />
                    <Route path="/exercicios-inferiores" element={<ExerciciosInferiores />} />
                    <Route path="/exercicios-aerobicos" element={<ExerciciosAerobicos />} />
                    <Route path="/exercicios-superiores" element={<ExerciciosSuperiores />} />
                    <Route path="/escolher-exercicios" element={<EscolherExercicios />} />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
