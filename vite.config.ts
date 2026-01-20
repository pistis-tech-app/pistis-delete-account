import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'redirect-without-trailing-slash',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/Pistis-users-data-management') {
            res.writeHead(302, { Location: '/Pistis-users-data-management/' });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  base: '/Pistis-users-data-management/',
})
