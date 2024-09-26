import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        exchange: 'pages/exchange.html',
      },
    },
  },
});
f;
