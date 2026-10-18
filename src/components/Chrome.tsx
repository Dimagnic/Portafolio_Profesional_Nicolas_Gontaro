import { useEffect, useRef, useState } from 'react'

export function Loader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 800)
    return () => clearTimeout(t)
  }, [])
  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <span className="loader-text">NG</span>
    </div>
  )
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return
    let cx = 0, cy = 0, rx = 0, ry = 0, raf = 0
    const move = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
      if (dot.current) {
        dot.current.style.left = cx + 'px'
        dot.current.style.top = cy + 'px'
      }
    }
    const loop = () => {
      rx += (cx - rx) * 0.12
      ry += (cy - ry) * 0.12
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    const hoverSel = 'a,button,.skill-card,.project-card,.contact-card,.stat-card'
    const over = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(hoverSel)) return
      if (dot.current) dot.current.style.transform = 'translate(-50%,-50%) scale(2)'
      if (ring.current) { ring.current.style.width = '60px'; ring.current.style.height = '60px' }
    }
    const out = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(hoverSel)) return
      if (dot.current) dot.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ring.current) { ring.current.style.width = '36px'; ring.current.style.height = '36px' }
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    raf = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

export function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div id="progress-bar" style={{ width: pct + '%' }} />
}

const LINKS: [string, string][] = [
  ['#sobre-mi', 'Sobre mí'],
  ['#habilidades', 'Habilidades'],
  ['#experiencia', 'Experiencia'],
  ['#portafolio', 'Portafolio'],
  ['#contacto', 'Contacto'],
]

export function Navbar({ logo }: { logo: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 50)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <button className="close-menu" aria-label="Cerrar menú" onClick={() => setOpen(false)}>✕</button>
        {LINKS.map(([h, t]) => (
          <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>
        ))}
      </div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#inicio" className="nav-logo">{logo}</a>
        <ul className="nav-links">
          {LINKS.map(([h, t]) => (
            <li key={h}><a href={h}>{t}</a></li>
          ))}
        </ul>
        <button className="nav-hamburger" aria-label="Abrir menú" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>
    </>
  )
}
