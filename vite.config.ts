import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { NODE_ENV: mode, ...loadEnv(mode, process.cwd()) };

  return {
    define: {
      "process.env": env,
    },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
   
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'app/javascript/App/'),
        timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      },
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    externals: {
      EventEmitter: 'events',
    },
    rollupOptions: {
      external: ['__vite-browser-external'], // Add '__vite-browser-external' to the list
    },
  };
});
