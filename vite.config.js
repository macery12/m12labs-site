import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildId = process.env.VITE_BUILD_ID || process.env.GITHUB_SHA || Date.now().toString();

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_ID__: JSON.stringify(buildId)
  }
});
