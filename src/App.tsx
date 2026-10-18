import { useEffect, useState } from 'react'
import type { SiteContent } from './types'
import { defaultContent } from './data/defaultContent'
import { loadContent, saveContent } from './lib/content'
import { supabase } from './lib/supabase'
import { Cursor, Loader, Navbar, ProgressBar } from './components/Chrome'
import { About, Contact, Experience, Footer, FloatingActions, Hero, Portfolio, Skills } from './components/Sections'
import { AdminButton, CmsPanel, LoginModal } from './components/Admin'

export default function App() {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loginOpen, setLoginOpen] = useState(false)
  const [cmsOpen, setCmsOpen] = useState(false)

  useEffect(() => {
    loadContent().then(setContent)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    Object.entries(content.theme).forEach(([k, v]) => root.style.setProperty(k, v))
    document.title = content.nav.pageTitle
  }, [content.theme, content.nav.pageTitle])

  // El panel cubre toda la pantalla: bloquea el scroll del sitio mientras está abierto
  useEffect(() => {
    document.body.style.overflow = cmsOpen ? 'hidden' : ''
  }, [cmsOpen])

  const openAdmin = async () => {
    if (supabase) {
      const { data } = await supabase.auth.getSession()
      if (data.session) return setCmsOpen(true)
    }
    setLoginOpen(true)
  }

  const logout = async () => {
    await supabase?.auth.signOut()
    setCmsOpen(false)
  }

  return (
    <>
      <Loader />
      <Cursor />
      <ProgressBar />
      <Navbar logo={content.nav.logo} />
      <Hero c={content} />
      <About c={content} />
      <Skills c={content} />
      <Experience c={content} />
      <Portfolio c={content} />
      <Contact c={content} />
      <FloatingActions c={content} />
      <Footer c={content} />
      <AdminButton onClick={openAdmin} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => { setLoginOpen(false); setCmsOpen(true) }} />
      <CmsPanel open={cmsOpen} content={content} onChange={setContent} onSave={() => saveContent(content)} onLogout={logout} />
    </>
  )
}
