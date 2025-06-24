import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(), // React stays here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // ← Move tailwindcss() here
      ],
    },
  },
})
