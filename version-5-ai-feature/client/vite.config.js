import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({

  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
  },

  server: {

    proxy: {

      "/api": {

        target:
          "https://backend-answer-keys.onrender.com/",

        changeOrigin: true,

        secure: false,

        rewrite: (path) =>
          path.replace(/^\/api/, ""),
      },
    },
  },

  plugins: [react()],
});