# Portafolio Profesional · Nicolás Gontaro

Vite + React + TypeScript · Supabase (contenido, auth y storage) · Vercel · GitHub.

## Desarrollo
```bash
npm install
cp .env.example .env.local   # agrega VITE_SUPABASE_ANON_KEY
npm run dev
```
Sin `VITE_SUPABASE_ANON_KEY` el sitio funciona con el contenido de fábrica. En modo dev el panel Admin
acepta `admin / admin123` y guarda solo en tu navegador.

## Supabase
1. Ejecuta `supabase/schema.sql` en el SQL Editor (cambia `TU_CORREO@dominio.com`).
2. Crea tu usuario en Authentication → Users y desactiva el registro público.
3. Entra con el botón **Admin** usando ese correo y contraseña; **Publicar cambios** guarda en `site_content`.

## Vercel
Importa el repo, agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`, y despliega (detecta Vite solo).

## Notas
- Widget de ClienteAI: `<script>` al final de `index.html` (botón flotante debajo de WhatsApp/Messenger/Telegram).
- Los textos de "Sobre mí", habilidades y experiencia siguen siendo los del HTML original; edítalos desde el panel.
