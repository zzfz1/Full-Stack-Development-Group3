import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// vite.config.js
// import { defineConfig } from "vite";

// export default defineConfig({
//   root: "./", // Project root directory
//   base: "/", // Public path
//   build: {
//     outDir: "dist", // Output directory for the build
//   },
//   server: {
//     host: "localhost",
//     port: 5000, // Make sure the port matches the one you're trying to access
//   },
// });
