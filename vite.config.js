import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  root: '.',
  
  server: {
    port: 3000,
    open: true,
    allowedHosts: [
      '3f06a6eedb2d.ngrok-free.app'
    ],
      hmr: {
      overlay: true
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}); 