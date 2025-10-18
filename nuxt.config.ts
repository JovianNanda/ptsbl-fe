// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:1337/api",
    },
  },
});
