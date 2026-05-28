import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config as loadEnv } from 'dotenv'

loadEnv({ path: '.env' })
// Dev-only plugin: serves api/* functions inside the Vite dev server
function apiPlugin() {
  return {
    name: 'vite-api',
    configureServer(server) {
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
