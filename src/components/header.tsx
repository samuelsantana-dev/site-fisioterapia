import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { headerEscolherExercicios, headerHome, headerLogin, headerTermoConcenso } from '../routes/links';
import '../style/header.scss';

export function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header">
      <a href="#default" className="logo">CompanyLogo</a>
      <div className="header-right">
        <div className={`menu-icon ${showMenu ? 'open' : ''}`} onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
        </div>
        <div className={`menu-links ${showMenu ? 'open' : ''}`}>
          <a href={headerHome.href} rel={headerHome.rel} className={headerHome.className}>{headerHome.value}</a>
          <a href={headerLogin.href} rel={headerLogin.rel} className={headerLogin.className}>{headerLogin.value}</a>
          <a href={headerEscolherExercicios.href} rel={headerEscolherExercicios.rel} className={headerEscolherExercicios.className}>{headerEscolherExercicios.value}</a>
          <a href={headerTermoConcenso.href} rel={headerTermoConcenso.rel} className={headerTermoConcenso.className}>{headerTermoConcenso.value}</a>
        </div>
      </div>
    </div>
  );
}