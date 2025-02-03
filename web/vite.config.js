import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import config from './src/config.js' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: config.server.host,
    port: config.server.port,
    strictPort: true
  }
})
