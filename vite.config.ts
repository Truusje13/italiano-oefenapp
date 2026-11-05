import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/italiano-oefenapp/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Italiano oefenen",
        short_name: "Italiano",
        description: "Oefen en herhaal de lessen van Dieci lezioni di italiano",
        lang: "nl",
        theme_color: "#009246",
        background_color: "#1a1412",
        display: "standalone",
        start_url: "./",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"]
      }
    })
  ]
});
