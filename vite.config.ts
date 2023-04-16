import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      core: `${path.resolve(__dirname, "./src/core/")}`,
      routes: `${path.resolve(__dirname, "./src/routes/")}`,
      shared: path.resolve(__dirname, "./src/shared"),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
});
