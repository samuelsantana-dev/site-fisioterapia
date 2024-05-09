import { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="layout">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
