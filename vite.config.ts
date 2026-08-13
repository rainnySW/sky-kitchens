import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import expressApp from './api/index.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server',
      configureServer(server) {
        server.middlewares.use(expressApp);
      }
    }
  ]
});
