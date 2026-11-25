import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { mothersDay as data } from './src/data/mothersDay'

const configured = [...Object.values(data.audio), data.video]
const files = configured.filter(path => path && (
  /^https?:\/\//i.test(path) || existsSync(resolve('public', path.replace(/^\/+/, '')))
))
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export default defineConfig({
  define: { __AVAILABLE_MEDIA__: JSON.stringify(files) },
  plugins: [
    tailwind(),
    {
      name: 'metadata-hari-ibu',
      transformIndexHtml(html) {
        return html
          .replace('<title>Rumah yang Selalu Kurindukan</title>', '<title>' + escapeHtml(data.title) + '</title>')
          .replace('property="og:title" content="Rumah yang Selalu Kurindukan"', 'property="og:title" content="' + escapeHtml(data.title) + '"')
          .replace('content="noindex,nofollow"', 'content="' + (data.privacy.noIndex ? 'noindex,nofollow' : 'index,follow') + '"')
          .replace('content="/images/home/pratinjau.png"', 'content="' + escapeHtml(data.privacy.previewImage) + '"')
      },
    },
  ],
})
