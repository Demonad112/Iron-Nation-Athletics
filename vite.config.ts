import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site under /Iron-Nation-Athletics/.
// Switch to '/' when moving to a custom domain (see README).
export default defineConfig({
  base: '/Iron-Nation-Athletics/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 700 },
})
