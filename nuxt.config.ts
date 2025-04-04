// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@clerk/nuxt", "@nuxthub/core"],
  hub: {
    database: true,
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  clerk: {
    skipServerMiddleware: true,
  },
});
