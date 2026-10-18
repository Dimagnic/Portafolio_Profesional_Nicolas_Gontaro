export interface Project {
  id: string
  title: string
  tag: string
  description: string
  url: string
  image: string
}

export interface FloatBtn {
  url: string
  tooltip: string
  icon: string
}

export interface SiteContent {
  theme: Record<string, string>
  nav: { logo: string; pageTitle: string }
  hero: {
    eyebrow: string
    namePre: string
    nameSpan: string
    title: string
    btn1: string
    btn2: string
    avatar: string
  }
  about: {
    label: string
    title: string
    p1: string
    p2: string
    stats: { num: string; label: string }[]
    image: string
    video: string
  }
  skills: { label: string; title: string; items: { name: string; desc: string }[] }
  experience: {
    label: string
    title: string
    items: { date: string; company: string; role: string; desc: string }[]
  }
  portfolio: { label: string; title: string; projects: Project[] }
  contact: {
    label: string
    title: string
    intro: string
    phone: string
    phoneHref: string
    email: string
    emailHref: string
  }
  floating: { whatsapp: FloatBtn; messenger: FloatBtn; telegram: FloatBtn }
  social: { linkedin: string; instagram: string; twitter: string }
  footer: { tagline: string; credit: string; copyrightName: string; year: string }
}
