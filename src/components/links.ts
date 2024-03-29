import { IconType } from 'react-icons';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

interface Link {
    className: string;
    rel: string;
    target: string;
    href: string;
    value: string;
    icon: IconType;
}

const createLink = (href: string, value: string, icon: IconType): Link => ({
    className: 'links',
    rel: 'noreferrer',
    target: '_blank',
    href,
    value,
    icon
});

export const instagram: Link = createLink("#", "Instagram", FaInstagram);
export const tiktok: Link = createLink("#", "TikTok", FaTiktok);
export const whatsapp: Link = createLink("#", "WhatsApp", FaWhatsapp);
export const techWorld: Link = createLink("#", "Tech World", FaInstagram);