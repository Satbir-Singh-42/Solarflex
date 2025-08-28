import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "fb1f0e42-cf3a-40d7-ac7c-054b006d9148-00-9v1cfj0ylafq.riker.replit.dev",
      "localhost",
      "127.0.0.1",
      /.*\.replit\.dev$/,
      /.*\.repl\.co$/
    ],
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
}));