import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    optimizeDeps: {
      include: ["react-toastify"],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-toastify")) {
            return "react-toastify";
          }
        },
      },
    },
  },
});
