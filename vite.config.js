import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En local, `npm run dev:api` levanta Express en el 3000 y Vite le pasa /api.
    // En Vercel no hace falta: vercel.json enruta /api a la función serverless.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
