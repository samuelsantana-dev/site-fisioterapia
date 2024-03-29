import '../../src/style/linkRoutes.scss'

interface Link {
    className: string;
    // target: string;
    rel: string;
    href: string;
    value: string
}

const routesLink = (): Link => ({
    className: 'btn_outline',
    // target: '_blank',
    rel: 'noreferrer',
    href: '',
    value: ''
});

export const home = { ...routesLink(), href: "/", value: 'Pagina Inicial' };
export const login = { ...routesLink(), href: "/login", value: 'Login' };
export const cadastro = { ...routesLink(), href: "/cadastro", value: 'cadastre-se' };

export const escolherExercicios = { ...routesLink(), href: "/escolher-exercicios", value: 'Escolher Exercicios' };
export const exerciciosInferiores = { ...routesLink(), href: "/exercicios-inferiores", value: 'Exercicios Inferiores' };
export const exerciciosSuperiores = { ...routesLink(), href: "/exercicios-superiores", value: 'Exercicios Superiores' };
export const termoConcenso = { ...routesLink(), href: "/tela-termo-concenso", value: 'Termo de Concenso' };

//header
export const headerHome = { ...routesLink(), href: "/", value: 'Home' };
export const headerLogin = { ...routesLink(), href: "/login", value: 'Login' };
export const headerEscolherExercicios = { ...routesLink(), href: "/escolher-exercicios", value: 'Exercicios' };
export const headerTermoConcenso = { ...routesLink(), href: "/tela-termo-concenso", value: 'Termo' };


