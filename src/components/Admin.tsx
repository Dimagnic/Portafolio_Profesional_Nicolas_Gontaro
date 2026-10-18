import { useEffect, useState, type ChangeEvent } from 'react'
import type { SiteContent } from '../types'
import { THEMES } from '../data/defaultContent'
import { supabase, supabaseEnabled } from '../lib/supabase'
import { uploadMedia } from '../lib/content'
import { Upload, User } from './Icons'

type Path = (string | number)[]

function getAt(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((o, k) => (o as Record<string | number, unknown>)?.[k], obj)
}
function setAt<T>(obj: T, path: Path, value: unknown): T {
  if (!path.length) return value as T
  const [k, ...rest] = path
  const clone: any = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) }
  clone[k] = setAt(clone[k], rest, value)
  return clone
}

/* ───────────────────────── Botón Admin (misma posición y estilo) ───────────────────────── */
export function AdminButton({ onClick }: { onClick: () => void }) {
  return (
    <button id="admin-btn" onClick={onClick}>
      <User />
      Admin
    </button>
  )
}

/* ───────────────────────── Login ───────────────────────── */
const DEV_USER = 'admin'
const DEV_PASS = 'admin123'
const canDevLogin = !supabaseEnabled && import.meta.env.DEV

export function LoginModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) { setUser(''); setPass(''); setError('') }
  }, [open])

  const doLogin = async () => {
    setError('')
    if (supabase) {
      setBusy(true)
      const { error: err } = await supabase.auth.signInWithPassword({ email: user.trim(), password: pass })
      setBusy(false)
      if (err) return setError('Credenciales incorrectas')
      return onSuccess()
    }
    if (canDevLogin && user.trim() === DEV_USER && pass === DEV_PASS) return onSuccess()
    setError(canDevLogin ? 'Credenciales incorrectas' : 'Supabase no está configurado en este despliegue')
  }

  return (
    <div className={`cms-overlay ${open ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="login-box">
        <button className="close-modal" onClick={onClose}>✕</button>
        <h2>Panel CMS</h2>
        <p>Ingresa tus credenciales para acceder</p>
        <div className="login-field">
          <label>{supabaseEnabled ? 'Correo' : 'Usuario'}</label>
          <input type={supabaseEnabled ? 'email' : 'text'} placeholder={supabaseEnabled ? 'tu@correo.com' : 'admin'} autoComplete="off" value={user} onChange={(e) => setUser(e.target.value)} autoFocus={open} />
        </div>
        <div className="login-field">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && doLogin()} />
        </div>
        <button className="login-btn" onClick={doLogin} disabled={busy}>{busy ? 'Verificando…' : 'Ingresar al CMS'}</button>
        {error && <p className="login-error" style={{ display: 'block' }}>❌ {error}</p>}
      </div>
    </div>
  )
}

/* ───────────────────────── Campos ───────────────────────── */
interface Ctx {
  c: SiteContent
  set: (path: Path, v: unknown) => void
  toast: (m: string) => void
}

function T({ ctx, path, label, area, rows = 3 }: { ctx: Ctx; path: Path; label: string; area?: boolean; rows?: number }) {
  const v = String(getAt(ctx.c, path) ?? '')
  return (
    <div className="cms-field">
      <label>{label}</label>
      {area ? (
        <textarea rows={rows} value={v} onChange={(e) => ctx.set(path, e.target.value)} />
      ) : (
        <input type="text" value={v} onChange={(e) => ctx.set(path, e.target.value)} />
      )}
    </div>
  )
}

function Img({ ctx, path, label, accept = 'image/*', video }: { ctx: Ctx; path: Path; label: string; accept?: string; video?: boolean }) {
  const src = String(getAt(ctx.c, path) ?? '')
  const [busy, setBusy] = useState(false)
  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setBusy(true)
    try {
      ctx.set(path, await uploadMedia(f))
      ctx.toast('✓ Archivo actualizado')
    } catch (err) {
      ctx.toast('✗ ' + (err instanceof Error ? err.message : 'No se pudo subir'))
    }
    setBusy(false)
    e.target.value = ''
  }
  return (
    <div className="cms-field">
      <label>{label}</label>
      {src && (video ? <video className="cms-img-preview" src={src} muted controls /> : <img className="cms-img-preview" src={src} alt="" />)}
      <label className="cms-img-upload-btn">
        <Upload />
        {busy ? 'Subiendo…' : 'Subir archivo'}
        <input type="file" accept={accept} style={{ display: 'none' }} onChange={onFile} />
      </label>
    </div>
  )
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="cms-card"><h4>{title}</h4>{children}</div>
)

const Head = ({ title, desc }: { title: string; desc: string }) => (
  <>
    <div className="cms-section-title">{title}</div>
    <div className="cms-section-desc">{desc}</div>
  </>
)

/* ───────────────────────── Secciones ───────────────────────── */
function Colors({ ctx }: { ctx: Ctx }) {
  const fields: [string, string][] = [
    ['--bg', 'Fondo'], ['--bg2', 'Fondo 2'], ['--surface', 'Superficie'], ['--accent', 'Acento'],
    ['--accent2', 'Acento 2'], ['--white', 'Texto'], ['--gray', 'Gris'],
  ]
  const presets: [string, string, string?][] = [
    ['gold', '✦ Dorado (actual)'], ['ocean', '◈ Océano Azul', '#4fc3f7'], ['forest', '◉ Bosque Verde', '#a5d6a7'],
    ['rose', '◆ Rosa Moderno', '#f48fb1'], ['purple', '◈ Púrpura', '#ce93d8'], ['light', '◻ Tema Claro', '#fff'],
  ]
  return (
    <>
      <Head title="Colores & Tema" desc="Personaliza la paleta de colores del sitio en tiempo real" />
      <Card title="Paleta principal">
        <div className="color-row">
          {fields.map(([k, l]) => (
            <div className="color-item" key={k}>
              <label>{l}</label>
              <input type="color" value={ctx.c.theme[k] ?? '#000000'} onChange={(e) => ctx.set(['theme', k], e.target.value)} />
            </div>
          ))}
        </div>
      </Card>
      <Card title="Presets de tema">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {presets.map(([k, l, bg]) => (
            <button key={k} className="cms-apply-btn" style={bg ? { background: bg, color: '#000' } : undefined}
              onClick={() => { ctx.set(['theme'], THEMES[k]); ctx.toast('✓ Tema aplicado') }}>{l}</button>
          ))}
        </div>
      </Card>
    </>
  )
}

function Header({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Encabezado / Hero" desc="Edita el contenido de la sección principal" />
      <Card title="Navegación">
        <T ctx={ctx} path={['nav', 'logo']} label="Logo / Siglas" />
        <T ctx={ctx} path={['nav', 'pageTitle']} label="Título del sitio (pestaña del navegador)" />
      </Card>
      <Card title="Avatar / Foto de perfil"><Img ctx={ctx} path={['hero', 'avatar']} label="Foto" /></Card>
      <Card title="Textos del Hero">
        <T ctx={ctx} path={['hero', 'eyebrow']} label="Eyebrow (texto pequeño arriba)" />
        <T ctx={ctx} path={['hero', 'namePre']} label="Nombre principal" />
        <T ctx={ctx} path={['hero', 'nameSpan']} label="Nombre destacado (dorado)" />
        <T ctx={ctx} path={['hero', 'title']} label="Subtítulo" />
        <div className="cms-field-row">
          <T ctx={ctx} path={['hero', 'btn1']} label="Botón 1 (texto)" />
          <T ctx={ctx} path={['hero', 'btn2']} label="Botón 2 (texto)" />
        </div>
      </Card>
    </>
  )
}

function About({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Sobre mí" desc="Edita la sección de presentación personal" />
      <Card title="Imagen y video">
        <Img ctx={ctx} path={['about', 'image']} label="Imagen (fachada)" />
        <Img ctx={ctx} path={['about', 'video']} label="Video" accept="video/mp4,video/webm" video />
      </Card>
      <Card title="Textos">
        <T ctx={ctx} path={['about', 'label']} label="Etiqueta sección" />
        <T ctx={ctx} path={['about', 'title']} label="Título (Enter = salto de línea)" area rows={2} />
        <T ctx={ctx} path={['about', 'p1']} label="Párrafo 1" area />
        <T ctx={ctx} path={['about', 'p2']} label="Párrafo 2" area />
      </Card>
      <Card title="Estadísticas">
        {ctx.c.about.stats.map((_, i) => (
          <div className="stat-edit-row" key={i}>
            <T ctx={ctx} path={['about', 'stats', i, 'num']} label="Número" />
            <T ctx={ctx} path={['about', 'stats', i, 'label']} label="Etiqueta" />
          </div>
        ))}
      </Card>
    </>
  )
}

function Skills({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Habilidades" desc="Edita los textos de la sección de habilidades" />
      <Card title="Encabezado">
        <T ctx={ctx} path={['skills', 'label']} label="Etiqueta" />
        <T ctx={ctx} path={['skills', 'title']} label="Título" />
      </Card>
      {ctx.c.skills.items.map((_, i) => (
        <Card title={`Habilidad ${i + 1}`} key={i}>
          <T ctx={ctx} path={['skills', 'items', i, 'name']} label="Nombre" />
          <T ctx={ctx} path={['skills', 'items', i, 'desc']} label="Descripción" area rows={2} />
        </Card>
      ))}
    </>
  )
}

function Experience({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Experiencia" desc="Edita el historial de experiencia profesional" />
      <Card title="Encabezado">
        <T ctx={ctx} path={['experience', 'label']} label="Etiqueta" />
        <T ctx={ctx} path={['experience', 'title']} label="Título" />
      </Card>
      {ctx.c.experience.items.map((_, i) => (
        <Card title={`Trabajo ${i + 1}`} key={i}>
          <T ctx={ctx} path={['experience', 'items', i, 'date']} label="Período" />
          <T ctx={ctx} path={['experience', 'items', i, 'company']} label="Empresa" />
          <T ctx={ctx} path={['experience', 'items', i, 'role']} label="Rol" />
          <T ctx={ctx} path={['experience', 'items', i, 'desc']} label="Descripción" area />
        </Card>
      ))}
    </>
  )
}

function Portfolio({ ctx }: { ctx: Ctx }) {
  const projects = ctx.c.portfolio.projects
  const move = (i: number, d: -1 | 1) => {
    const j = i + d
    if (j < 0 || j >= projects.length) return
    const arr = [...projects]
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    ctx.set(['portfolio', 'projects'], arr)
  }
  return (
    <>
      <Head title="Portafolio" desc="Gestiona los proyectos: título, descripción, imagen y enlace al sitio" />
      <Card title="Encabezado">
        <T ctx={ctx} path={['portfolio', 'label']} label="Etiqueta" />
        <T ctx={ctx} path={['portfolio', 'title']} label="Título" />
      </Card>
      {projects.map((p, i) => (
        <Card title={`Proyecto ${i + 1} · ${p.title}`} key={p.id}>
          <Img ctx={ctx} path={['portfolio', 'projects', i, 'image']} label="Captura / imagen" />
          <T ctx={ctx} path={['portfolio', 'projects', i, 'title']} label="Título" />
          <T ctx={ctx} path={['portfolio', 'projects', i, 'tag']} label="Etiqueta / categoría" />
          <T ctx={ctx} path={['portfolio', 'projects', i, 'description']} label="Descripción" area />
          <T ctx={ctx} path={['portfolio', 'projects', i, 'url']} label="URL del sitio (redirección)" />
          <div className="cms-row-actions">
            <button className="cms-ghost-btn" onClick={() => move(i, -1)} disabled={i === 0}>↑ Subir</button>
            <button className="cms-ghost-btn" onClick={() => move(i, 1)} disabled={i === projects.length - 1}>↓ Bajar</button>
            <button className="cms-ghost-btn cms-danger-btn" onClick={() => ctx.set(['portfolio', 'projects'], projects.filter((_, k) => k !== i))}>Eliminar</button>
          </div>
        </Card>
      ))}
      <button className="cms-apply-btn" onClick={() =>
        ctx.set(['portfolio', 'projects'], [...projects, { id: 'p' + Date.now(), title: 'Nuevo proyecto', tag: 'Categoría', description: 'Describe de qué trata el sitio.', url: 'https://', image: '' }])
      }>+ Agregar proyecto</button>
    </>
  )
}

function Contact({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Contacto" desc="Actualiza la información de contacto" />
      <Card title="Textos">
        <T ctx={ctx} path={['contact', 'label']} label="Etiqueta sección" />
        <T ctx={ctx} path={['contact', 'title']} label="Título" />
        <T ctx={ctx} path={['contact', 'intro']} label="Texto introductorio" area />
      </Card>
      <Card title="Datos de contacto">
        <T ctx={ctx} path={['contact', 'phone']} label="Teléfono (visible)" />
        <T ctx={ctx} path={['contact', 'phoneHref']} label="Teléfono (enlace tel:)" />
        <T ctx={ctx} path={['contact', 'email']} label="Email (visible)" />
        <T ctx={ctx} path={['contact', 'emailHref']} label="Email (enlace mailto:)" />
      </Card>
    </>
  )
}

function Floating({ ctx }: { ctx: Ctx }) {
  const rows: [keyof SiteContent['floating'], string, string][] = [
    ['whatsapp', 'WhatsApp', 'Formato: https://api.whatsapp.com/send?phone=NUMERO'],
    ['messenger', 'Messenger / Facebook', 'Puedes usar tu perfil de Facebook, página o enlace de Messenger directo.'],
    ['telegram', 'Telegram', 'Formato usuario: https://t.me/tunombre'],
  ]
  return (
    <>
      <Head title="Botones Flotantes" desc="Edita los enlaces de los botones de mensajería fijos en la esquina derecha. El widget de ClienteAI queda debajo de ellos." />
      {rows.map(([k, label, hint]) => (
        <Card title={label} key={k}>
          <Img ctx={ctx} path={['floating', k, 'icon']} label="Ícono" />
          <T ctx={ctx} path={['floating', k, 'tooltip']} label="Tooltip (texto al pasar el mouse)" />
          <T ctx={ctx} path={['floating', k, 'url']} label={`URL de ${label}`} />
          <div className="cms-hint">{hint}</div>
        </Card>
      ))}
    </>
  )
}

function Social({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Redes Sociales" desc="Se aplican en el hero, en contacto y en el footer" />
      <Card title="LinkedIn"><T ctx={ctx} path={['social', 'linkedin']} label="URL de LinkedIn" /></Card>
      <Card title="Instagram"><T ctx={ctx} path={['social', 'instagram']} label="URL de Instagram" /></Card>
      <Card title="Twitter / X"><T ctx={ctx} path={['social', 'twitter']} label="URL de Twitter/X" /></Card>
    </>
  )
}

function Footer({ ctx }: { ctx: Ctx }) {
  return (
    <>
      <Head title="Footer" desc="Textos del pie de página (logo y QR de ClienteAI son fijos)" />
      <Card title="Textos">
        <T ctx={ctx} path={['footer', 'tagline']} label="Descripción bajo el logo" area rows={2} />
        <T ctx={ctx} path={['footer', 'copyrightName']} label="Nombre (copyright)" />
        <T ctx={ctx} path={['footer', 'year']} label="Año" />
        <T ctx={ctx} path={['footer', 'credit']} label="Diseñado por" />
      </Card>
    </>
  )
}

const SECTIONS: [string, string, (p: { ctx: Ctx }) => React.ReactElement][] = [
  ['colors', 'Colores & Tema', Colors],
  ['header', 'Encabezado / Hero', Header],
  ['about', 'Sobre mí', About],
  ['skills', 'Habilidades', Skills],
  ['experience', 'Experiencia', Experience],
  ['portfolio', 'Portafolio', Portfolio],
  ['contact', 'Contacto', Contact],
  ['floating', 'Botones Flotantes', Floating],
  ['social', 'Redes Sociales', Social],
  ['footer', 'Footer', Footer],
]

/* ───────────────────────── Panel ───────────────────────── */
interface PanelProps {
  open: boolean
  content: SiteContent
  onChange: (c: SiteContent) => void
  onSave: () => Promise<{ ok: boolean; message: string }>
  onLogout: () => void
}

export function CmsPanel({ open, content, onChange, onSave, onLogout }: PanelProps) {
  const [section, setSection] = useState('colors')
  const [toastMsg, setToastMsg] = useState('')
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  const toast = (m: string) => {
    setToastMsg(m)
    window.setTimeout(() => setToastMsg(''), 2200)
  }
  const ctx: Ctx = {
    c: content,
    toast,
    set: (path, v) => { onChange(setAt(content, path, v)); setDirty(true) },
  }
  const save = async () => {
    setSaving(true)
    const r = await onSave()
    setSaving(false)
    if (r.ok) setDirty(false)
    toast((r.ok ? '✓ ' : '✗ ') + r.message)
  }
  const Active = SECTIONS.find(([k]) => k === section)![2]

  return (
    <>
      <div className={`cms-panel ${open ? 'open' : ''}`}>
        <div className="cms-sidebar">
          <div className="cms-sidebar-header"><h3>CMS Admin</h3><p>Edición en tiempo real</p></div>
          <nav className="cms-nav">
            {SECTIONS.map(([k, label]) => (
              <div key={k} className={`cms-nav-item ${section === k ? 'active' : ''}`} onClick={() => setSection(k)}>{label}</div>
            ))}
          </nav>
          <div className="cms-logout"><button onClick={onLogout}>⬅ Cerrar sesión</button></div>
        </div>
        <div className="cms-content">
          <div className="cms-savebar">
            <div className="status">
              {dirty ? <b>Cambios sin publicar</b> : 'Todo publicado'} ·{' '}
              {supabaseEnabled ? 'se guardan en Supabase' : 'modo local (sin Supabase)'}
            </div>
            <button className="cms-apply-btn" style={{ marginTop: 0 }} onClick={save} disabled={saving || !dirty}>
              {saving ? 'Guardando…' : 'Publicar cambios'}
            </button>
          </div>
          <div className="cms-section active"><Active ctx={ctx} /></div>
        </div>
      </div>
      <div className={`cms-toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </>
  )
}
