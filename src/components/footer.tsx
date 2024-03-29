
// import {FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
// import { instagram, whatsapp, tiktok } from './links';

import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import '../style/footer.scss';
import { instagram, tiktok, whatsapp } from './links';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-icons">
        <p className="footer-logo">
          FISIOTERAPIA © 2023
        </p>
      
        <a {...instagram}>
          <FaInstagram />
        </a>
        <a {...whatsapp}>
          <FaWhatsapp />
        </a>
        <a {...tiktok}>
          <FaTiktok />
        </a>
      </div>
  </footer>
  );
};
