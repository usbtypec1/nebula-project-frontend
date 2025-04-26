import tailwindcss from "@tailwindcss/vite"
import Aura from "@primeuix/themes/aura"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    server: {
      allowedHosts: true,
    },
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
    head: {
      script: [
        {
          src: "https://telegram.org/js/telegram-web-app.js?56",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  ssr: false,
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL?.replace(/\/$/, ""),
    },
  },
})