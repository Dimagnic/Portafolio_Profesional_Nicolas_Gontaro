import type { SiteContent } from '../types'
import { defaultContent } from '../data/defaultContent'
import { CONTENT_ID, CONTENT_TABLE, MEDIA_BUCKET, supabase } from './supabase'

type Obj = Record<string, unknown>
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Mezcla profunda: los valores guardados pisan a los de fábrica; los arreglos se reemplazan completos. */
export function deepMerge<T>(base: T, over: unknown): T {
  if (!isObj(base) || !isObj(over)) return (over === undefined || over === null ? base : over) as T
  const out: Obj = { ...base }
  for (const k of Object.keys(over)) out[k] = deepMerge((base as Obj)[k], over[k])
  return out as T
}

const LOCAL_KEY = 'ng-portfolio-content'

export async function loadContent(): Promise<SiteContent> {
  try {
    if (supabase) {
      const { data, error } = await supabase.from(CONTENT_TABLE).select('data').eq('id', CONTENT_ID).maybeSingle()
      if (!error && data?.data) return deepMerge(defaultContent, data.data)
    } else {
      const raw = localStorage.getItem(LOCAL_KEY)
      if (raw) return deepMerge(defaultContent, JSON.parse(raw))
    }
  } catch {
    /* si algo falla se muestra el contenido de fábrica */
  }
  return defaultContent
}

export async function saveContent(content: SiteContent): Promise<{ ok: boolean; message: string }> {
  if (!supabase) {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(content))
      return { ok: true, message: 'Guardado solo en este navegador (Supabase no configurado)' }
    } catch {
      return { ok: false, message: 'No se pudo guardar localmente' }
    }
  }
  const { error } = await supabase
    .from(CONTENT_TABLE)
    .upsert({ id: CONTENT_ID, data: content, updated_at: new Date().toISOString() })
  return error ? { ok: false, message: error.message } : { ok: true, message: 'Cambios publicados en Supabase' }
}

/** Sube un archivo a Supabase Storage (o lo devuelve como data URL si no hay Supabase). */
export async function uploadMedia(file: File): Promise<string> {
  if (supabase) {
    const safe = file.name.replace(/[^a-z0-9.]+/gi, '-').toLowerCase()
    const path = `${Date.now()}-${safe}`
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: false })
    if (error) throw error
    return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl
  }
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
}
