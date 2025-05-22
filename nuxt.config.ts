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
      websocket: true,
    },
  },
  clerk: {
    skipServerMiddleware: true,
  },
  runtimeConfig: {
    DEV_CLERK_REDIRECT_URL: process.env.DEV_CLERK_REDIRECT_URL,
    PROD_CLERK_REDIRECT_URL: process.env.PROD_CLERK_REDIRECT_URL,
  },
});
