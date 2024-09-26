import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        exchange: resolve(__dirname, 'pages/exchange.html'),
      },
    },
  },
});
f;
