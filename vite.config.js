import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lets-crack-gate/',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true
  }
})
