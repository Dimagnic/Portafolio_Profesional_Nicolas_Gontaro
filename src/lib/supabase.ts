import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseEnabled = Boolean(url && key)
export const supabase = supabaseEnabled ? createClient(url!, key!) : null

export const CONTENT_TABLE = 'site_content'
export const CONTENT_ID = 'main'
export const MEDIA_BUCKET = 'portfolio-media'
