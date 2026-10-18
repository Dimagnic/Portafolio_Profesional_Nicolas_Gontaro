import { Fragment, useRef, useState } from 'react'
import type { SiteContent } from '../types'
import Reveal from './Reveal'
import { ArrowUpRight, Instagram, LinkedIn, Mail, Phone, Photo, Play, SkillIcons, Twitter } from './Icons'

const Lines = ({ text }: { text: string }) => (
  <>
    {text.split('\n').map((l, i, a) => (
      <Fragment key={i}>
        {l}
        {i < a.length - 1 && <br />}
      </Fragment>
    ))}
  </>
)

const host = (url: string) => {
  try { return new URL(url).host.replace(/^www\./, '') } catch { return url }
}

export function Hero({ c }: { c: SiteContent }) {
  const h = c.hero
  const s = c.social
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-avatar-wrap">
        <div className="hero-avatar-ring" />
        <img className="hero-avatar" src={h.avatar} alt="Nicolás Gontaro" />
      </div>
      <p className="hero-eyebrow">{h.eyebrow}</p>
      <h1 className="hero-name">{h.namePre}<span>{h.nameSpan}</span></h1>
      <p className="hero-title">{h.title}</p>
      <div className="hero-cta">
        <a href="#portafolio" className="btn-primary">{h.btn1}</a>
        <a href="#contacto" className="btn-outline">{h.btn2}</a>
      </div>
      <div className="hero-social">
        <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
        <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
        <a href={s.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"><Twitter /></a>
      </div>
      <span className="hero-scroll">Scroll</span>
    </section>
  )
}

export function About({ c }: { c: SiteContent }) {
  const a = c.about
  const [mode, setMode] = useState<'foto' | 'video'>('foto')
  const video = useRef<HTMLVideoElement>(null)

  const choose = (m: 'foto' | 'video') => {
    setMode(m)
    if (m === 'video') requestAnimationFrame(() => video.current?.play().catch(() => undefined))
  }

  return (
    <section className="about-section" id="sobre-mi">
      <div className="about-inner">
        <Reveal className="about-img-wrap">
          <div className="about-media">
            {mode === 'foto' ? (
              <img src={a.image} alt="Cero+ Ciencias Aplicadas" />
            ) : (
              <video ref={video} src={a.video} poster={a.image} controls muted loop playsInline autoPlay />
            )}
            <div className="about-media-tabs">
              <button className={mode === 'foto' ? 'active' : ''} onClick={() => choose('foto')}><Photo />Fachada</button>
              <button className={mode === 'video' ? 'active' : ''} onClick={() => choose('video')}><Play />Video</button>
            </div>
          </div>
        </Reveal>
        <div className="about-content">
          <Reveal as="p" className="section-label">{a.label}</Reveal>
          <Reveal as="h2" className="section-title" delay={1}><Lines text={a.title} /></Reveal>
          <Reveal as="p" className="section-subtitle" delay={2} style={{ marginBottom: '1.5rem' }}>{a.p1}</Reveal>
          <Reveal as="p" className="section-subtitle" delay={3}>{a.p2}</Reveal>
          <Reveal className="about-stats" delay={4}>
            {a.stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Skills({ c }: { c: SiteContent }) {
  const k = c.skills
  return (
    <section className="skills-section" id="habilidades">
      <div className="skills-inner">
        <Reveal as="p" className="section-label">{k.label}</Reveal>
        <Reveal as="h2" className="section-title" delay={1}>{k.title}</Reveal>
        <div className="skills-grid">
          {k.items.map((s, i) => (
            <Reveal className="skill-card" delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4} key={i}>
              <div className="skill-icon">{SkillIcons[i % SkillIcons.length]}</div>
              <p className="skill-name">{s.name}</p>
              <p className="skill-desc">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Experience({ c }: { c: SiteContent }) {
  const e = c.experience
  return (
    <section className="experience-section" id="experiencia">
      <div className="exp-inner">
        <Reveal as="p" className="section-label">{e.label}</Reveal>
        <Reveal as="h2" className="section-title" delay={1}>{e.title}</Reveal>
        <div className="exp-timeline">
          {e.items.map((x, i) => (
            <Reveal className="exp-item" delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4} key={i}>
              <div className="exp-date">{x.date}</div>
              <div>
                <p className="exp-company">{x.company}</p>
                <p className="exp-role">{x.role}</p>
                <p className="exp-desc">{x.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Portfolio({ c }: { c: SiteContent }) {
  const p = c.portfolio
  return (
    <section className="portfolio-section" id="portafolio">
      <div className="portfolio-inner">
        <Reveal as="p" className="section-label">{p.label}</Reveal>
        <Reveal as="h2" className="section-title" delay={1}>{p.title}</Reveal>
        <div className="portfolio-grid">
          {p.projects.map((x, i) => (
            <Reveal key={x.id} delay={(i % 3 + 1) as 1 | 2 | 3}>
              <a className="project-card" href={x.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${x.title}`}>
                <div className="project-thumb">
                  <img src={x.image} alt={`Captura de ${x.title}`} loading="lazy" />
                </div>
                <div className="project-body">
                  <p className="project-tag">{x.tag}</p>
                  <h3 className="project-title">{x.title}</h3>
                  <p className="project-desc">{x.description}</p>
                  <span className="project-link">Visitar sitio <ArrowUpRight /><span className="host">{host(x.url)}</span></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact({ c }: { c: SiteContent }) {
  const k = c.contact
  const s = c.social
  return (
    <section className="contact-section" id="contacto">
      <div className="contact-inner">
        <Reveal as="p" className="section-label" style={{ justifyContent: 'center' }}>{k.label}</Reveal>
        <Reveal as="h2" className="section-title" delay={1}>{k.title}</Reveal>
        <Reveal as="p" className="contact-intro" delay={2}>{k.intro}</Reveal>
        <Reveal className="contact-cards" delay={3}>
          <a className="contact-card" href={`tel:${k.phoneHref}`}>
            <div className="contact-icon"><Phone /></div>
            <p className="contact-card-label">Teléfono</p>
            <p className="contact-card-value">{k.phone}</p>
          </a>
          <a className="contact-card" href={`mailto:${k.emailHref}`}>
            <div className="contact-icon"><Mail /></div>
            <p className="contact-card-label">Email</p>
            <p className="contact-card-value">{k.email}</p>
          </a>
        </Reveal>
        <Reveal className="social-links" delay={4}>
          <a className="social-link" href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
          <a className="social-link" href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
          <a className="social-link" href={s.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter /></a>
        </Reveal>
      </div>
    </section>
  )
}

export function FloatingActions({ c }: { c: SiteContent }) {
  const items = [
    ['float-whatsapp', c.floating.whatsapp, 'WhatsApp'],
    ['float-messenger', c.floating.messenger, 'Messenger'],
    ['float-telegram', c.floating.telegram, 'Telegram'],
  ] as const
  return (
    <div className="floating-actions">
      {items.map(([id, b, label]) => (
        <a key={id} className="float-btn" id={id} href={b.url} target="_blank" rel="noopener noreferrer" data-tooltip={b.tooltip} aria-label={label}>
          <img src={b.icon} alt="" />
        </a>
      ))}
    </div>
  )
}

const QR_CHAT_URL = 'https://clienteai.site/chat/hizeqwzfrrc3duf0'

export function Footer({ c }: { c: SiteContent }) {
  const f = c.footer
  const s = c.social
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <img className="footer-logo" src="/img/cero-logo-blanco.png" alt="Cero+" />
          <p>{f.tagline}</p>
          <p style={{ marginTop: '0.8rem' }}>Av. 2 Oriente 811, Col. Centro, Puebla</p>
          <a className="footer-mail" href={`mailto:${c.contact.emailHref}`}>{c.contact.email}</a>
          <a className="footer-wa" href={c.floating.whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp: {c.contact.phone}</a>
          <div className="footer-social">
            <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
            <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={s.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter /></a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Navegación</h5>
          <ul>
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#habilidades">Habilidades</a></li>
            <li><a href="#experiencia">Experiencia</a></li>
            <li><a href="#portafolio">Portafolio</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Servicios</h5>
          <ul>
            <li>Landing page y menú digital con QR</li>
            <li>Sitio web empresarial</li>
            <li>Catálogos, citas y reservaciones</li>
            <li>Tienda en línea</li>
            <li>Sistemas a la medida: CRM, POS, ERP</li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="https://cero-new-generation-e19z.vercel.app/" target="_blank" rel="noopener noreferrer">Aviso de privacidad</a></li>
            <li><a href="https://cero-new-generation-e19z.vercel.app/" target="_blank" rel="noopener noreferrer">Términos y condiciones</a></li>
          </ul>
          <p className="footer-note">Precios en pesos mexicanos, sujetos a cambio sin previo aviso. No se garantizan ventas ni posicionamientos específicos.</p>
        </div>
        <div className="footer-col footer-qr">
          <h5>Asistente virtual</h5>
          <a className="qr-card" href={QR_CHAT_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir asistente virtual">
            <img src="/img/qr-clienteai.png" alt="Código QR del asistente virtual ClienteAI" loading="lazy" />
          </a>
          <p className="footer-note">Escanea el código y chatea con nuestro asistente.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {f.year} {f.copyrightName}. Todos los derechos reservados.</span>
        <strong>Diseñado por {f.credit}</strong>
      </div>
    </footer>
  )
}
