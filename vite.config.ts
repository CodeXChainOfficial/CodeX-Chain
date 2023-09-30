import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { NODE_ENV: mode, ...loadEnv(mode, process.cwd()) };
  // process.env = { ...process.env, ...env };

  return {
    define: {
      "process.env": env,
    },
    plugins: [react({ jsxImportSource: "@emotion/react" })],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };
});
