import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    target: "node",
    format: "cjs",
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: "src/entry-server.tsx",
      output: {
        dir: "dist/server",
        // format: "",
      },
    },
  },
});
