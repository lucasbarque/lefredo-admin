import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@enums': path.resolve(__dirname, './src/enums'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@model': path.resolve(__dirname, './src/model'),
      '@services': path.resolve(__dirname, './src/services'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@env': path.resolve(__dirname, './src/env'),
      '@store': path.resolve(__dirname, './src/store'),
      '@adapters': path.resolve(__dirname, './src/adapters'),
    },
  },
});
