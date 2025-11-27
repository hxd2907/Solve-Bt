import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite sẽ tự inject biến môi trường qua import.meta.env
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: "dist",
    sourcemap: true
  }
});
