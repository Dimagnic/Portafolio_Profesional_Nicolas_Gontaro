import type { SiteContent } from '../types'

export const DEFAULT_THEME: Record<string, string> = {
  '--accent': '#c8a96e',
  '--accent2': '#e8c98f',
  '--bg': '#0a0a0a',
  '--bg2': '#111111',
  '--surface': '#1e1e1e',
  '--white': '#f5f0ea',
  '--gray': '#8a8a8a',
}

export const THEMES: Record<string, Record<string, string>> = {
  gold: DEFAULT_THEME,
  ocean: { '--accent': '#4fc3f7', '--accent2': '#81d4fa', '--bg': '#050d1a', '--bg2': '#071323', '--surface': '#0d1f35', '--white': '#e8f4fd', '--gray': '#7a9bb5' },
  forest: { '--accent': '#81c784', '--accent2': '#a5d6a7', '--bg': '#050f07', '--bg2': '#071409', '--surface': '#0d1f10', '--white': '#e8f5e9', '--gray': '#7a9e7c' },
  rose: { '--accent': '#f48fb1', '--accent2': '#f8bbd0', '--bg': '#0f050a', '--bg2': '#1a080f', '--surface': '#2a0f1a', '--white': '#fce4ec', '--gray': '#a87088' },
  purple: { '--accent': '#ce93d8', '--accent2': '#e1bee7', '--bg': '#080510', '--bg2': '#0f0819', '--surface': '#1a1025', '--white': '#f3e5f5', '--gray': '#9878a8' },
  light: { '--accent': '#b8860b', '--accent2': '#d4a017', '--bg': '#f8f5f0', '--bg2': '#ede8e0', '--surface': '#ffffff', '--white': '#1a1a1a', '--gray': '#666666' },
}

export const WHATSAPP_NUMBER = '522219663226'

export const defaultContent: SiteContent = {
  theme: DEFAULT_THEME,
  nav: { logo: 'NG', pageTitle: 'Nicolás Gontaro · Diseñador & Dev' },
  hero: {
    eyebrow: 'Diseñador & Desarrollador Web',
    namePre: 'Hola, soy ',
    nameSpan: 'Nico',
    title: 'Creo experiencias digitales que fusionan diseño y código',
    btn1: 'Ver portafolio',
    btn2: 'Contactarme',
    avatar: '/img/nico.webp',
  },
  about: {
    label: 'Sobre mí',
    title: 'Diseño con propósito,\ncódigo con pasión',
    p1: 'Soy un diseñador y desarrollador web apasionado por crear interfaces que no solo se ven increíbles, sino que también funcionan a la perfección. Combino pensamiento visual con habilidades técnicas para construir productos digitales memorables.',
    p2: 'Mi enfoque está centrado en el usuario y orientado a resultados. Desde la conceptualización hasta la implementación, me aseguro de que cada detalle cuente.',
    stats: [
      { num: '6+', label: 'Años de experiencia' },
      { num: '30+', label: 'Proyectos completados' },
      { num: '15+', label: 'Clientes satisfechos' },
      { num: '3', label: 'Empresas top' },
    ],
    image: '/img/cero-fachada.webp',
    video: '/video/cero-promo.mp4',
  },
  skills: {
    label: 'Especialidades',
    title: 'Mis habilidades',
    items: [
      { name: 'Mobile App Design', desc: 'Diseño de interfaces móviles intuitivas y fluidas para iOS y Android' },
      { name: 'UI / UX Design', desc: 'Creación de experiencias de usuario centradas en la usabilidad y la estética' },
      { name: 'Sistemas de Diseño', desc: 'Construcción de design systems escalables y consistentes para equipos' },
      { name: 'Desarrollo Web', desc: 'Implementación de interfaces con HTML, CSS, JavaScript y frameworks modernos' },
    ],
  },
  experience: {
    label: 'Trayectoria',
    title: 'Experiencia',
    items: [
      { date: '2017 — 2019', company: 'Wizeline', role: 'Visual Designer', desc: 'Diseño de interfaces visuales para productos digitales, creación de guías de estilo y colaboración con equipos de desarrollo para asegurar la consistencia visual en todos los productos.' },
      { date: '2019 — 2021', company: 'Microsoft Perú', role: 'Jefe de proyectos de desarrollo web y lógica funcional computacional', desc: 'Liderazgo de proyectos de desarrollo web: planificación y coordinación de equipos, definición de la lógica funcional de cada sistema, seguimiento de entregas y comunicación con las áreas involucradas.' },
      { date: '2021 — Julio 2023', company: 'Google Perú', role: 'Jefe de proyectos de desarrollo web y lógica funcional computacional', desc: 'Dirección de proyectos de desarrollo web y diseño de la lógica funcional computacional de las aplicaciones, coordinando a los equipos técnicos y asegurando calidad, tiempos y buenas prácticas.' },
    ],
  },
  portfolio: {
    label: 'Trabajos',
    title: 'Portafolio',
    projects: [
      { id: 'cleofas', title: 'Cleofas Game Center', tag: 'Videojuegos · Tiempo real', description: 'Sala de videojuegos en Puebla con disponibilidad en vivo de sus 5 PC gamer y 6 consolas Xbox. Los clientes consultan qué equipo está libre y lo reservan desde el celular, con panel para el administrador.', url: 'https://cleofas-game-center.vercel.app/', image: '/img/proyectos/cleofas.webp' },
      { id: 'suit-pos', title: 'Suit POS México', tag: 'SaaS · Punto de venta', description: 'Sistema de punto de venta en la nube para negocios en México. Acceso seguro con cuenta de Google para gestionar ventas desde cualquier dispositivo.', url: 'https://suit-pos-mexico.vercel.app/', image: '/img/proyectos/suit-pos.webp' },
      { id: 'univa', title: 'UNIVA', tag: 'Movilidad · Plataforma', description: 'Plataforma que conecta pasajeros con conductores verificados, con precios claros antes de pedir y ganancias transparentes para quien conduce. Piloto en preparación en Puebla.', url: 'https://univa-blond.vercel.app/', image: '/img/proyectos/univa.webp' },
      { id: 'clienteai', title: 'ClienteAI', tag: 'IA · SaaS', description: 'Crea un asistente de inteligencia artificial para tu negocio en 10 minutos, sin código. Atiende a tus clientes las 24 horas por chat y WhatsApp desde $299 MXN al mes.', url: 'https://clienteai.site/', image: '/img/proyectos/clienteai.webp' },
      { id: 'litros', title: 'Litros & Litros', tag: 'Restaurante · Karaoke bar', description: 'Sitio para un karaoke bar con menú promo, carta de bebidas y alimentos, hamburguesas, galería y eventos especiales, administrable desde un panel propio.', url: 'https://litrosylitros.site/', image: '/img/proyectos/litros.webp' },
      { id: 'nutrimax', title: 'Nutrimax', tag: 'Landing · Gimnasio', description: 'Página para un gimnasio y tienda de suplementos deportivos, con planes, galería, preguntas frecuentes y contacto directo por WhatsApp.', url: 'https://nutrimax-five.vercel.app/', image: '/img/proyectos/nutrimax.webp' },
      { id: 'adnpuebla', title: 'ADN Puebla', tag: 'Educación financiera', description: 'Sitio de una comunidad que enseña a fortalecer los hábitos financieros y construir un mejor futuro, con beneficios, comunidad y solicitud de información.', url: 'https://adnpuebla.site/', image: '/img/proyectos/adnpuebla.webp' },
      { id: 'clave-de-tres', title: 'Clave de Tres', tag: 'Landing · Estudio de baile', description: 'Landing premium para un estudio de baile: estilos, instructores, precios, testimonios y captación de clientes con clase gratis.', url: 'https://elevare-premium-dance.vercel.app/', image: '/img/proyectos/clave-de-tres.webp' },
      { id: 'docflow', title: 'DocFlow', tag: 'IA · Documentos', description: 'Convierte y corrige documentos PDF con IA. Subes tu archivo, eliges entre 8 idiomas y recibes el documento corregido en Word y PDF en segundos.', url: 'https://doc-flow-gamma.vercel.app/', image: '/img/proyectos/docflow.webp' },
    ],
  },
  contact: {
    label: 'Contacto',
    title: '¿Hablamos?',
    intro: 'Estoy disponible para proyectos freelance, colaboraciones y oportunidades de tiempo completo. No dudes en escribirme.',
    phone: '+52 221 966 3226',
    phoneHref: '+522219663226',
    email: 'nicolas.gontaro3@gmail.com',
    emailHref: 'nicolas.gontaro3@gmail.com',
  },
  floating: {
    whatsapp: { url: `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`, tooltip: 'WhatsApp', icon: '/img/icon-whatsapp.png' },
    messenger: { url: 'https://www.facebook.com/nicolasisraelgontaro/', tooltip: 'Messenger', icon: '/img/icon-messenger.png' },
    telegram: { url: 'https://web.telegram.org/', tooltip: 'Telegram', icon: '/img/icon-telegram.png' },
  },
  social: {
    linkedin: 'https://www.linkedin.com/feed/',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://twitter.com/home',
  },
  footer: {
    tagline: 'Sitios web y aplicaciones a la medida para negocios.',
    credit: 'Cero+',
    copyrightName: 'Nicolás Gontaro',
    year: '2026',
  },
}
