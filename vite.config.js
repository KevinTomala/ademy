import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config as loadEnv } from 'dotenv'
import fs from 'fs'
import path from 'path'

loadEnv({ path: '.env' })
// Dev-only plugin: serves api/* and /docs/* before the SPA fallback
function apiPlugin() {
  return {
    name: 'vite-api',
    configureServer(server) {
      // Serve /docs/ static files without SPA fallback interference
      server.middlewares.use('/docs', (req, res, next) => {
        const docsRoot = path.resolve('public/docs')
        let filePath = path.join(docsRoot, req.url === '/' ? '/index.html' : req.url)
        if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html')
        if (fs.existsSync(filePath)) {
          const ext = path.extname(filePath).slice(1)
          const mime = { html: 'text/html', css: 'text/css', js: 'application/javascript', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' }
          res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })

      server.middlewares.use('/api/demo', async (req, res) => {
        const { default: handler } = await import('./api/demo.js')
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try { req.body = JSON.parse(body) } catch { req.body = {} }

          // Polyfill Express-style helpers onto Node's ServerResponse
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          }

          await handler(req, res)
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
})
