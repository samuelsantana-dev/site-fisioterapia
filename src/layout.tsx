import { ReactNode } from 'react';
import { Footer } from './components/layout/footer';
import { Header } from './components/layout/header';

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
