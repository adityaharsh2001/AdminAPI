import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const proxy = require('vite-proxy')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  
})
