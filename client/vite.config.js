import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [
        { src: 'robots.txt', dest: '.' }
      ]
    }),
    
  ],
  server: {
    open: '/',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios'], // Mueve dependencias pesadas a un chunk separado
        }
      }
    }
  }
})
