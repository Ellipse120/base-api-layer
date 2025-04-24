// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/test-utils", "@nuxt/content"],

  nitro: {
    storage: {
      uploads: {
        driver: 'fs',
        base: './public/uploads'
      }
    }
  },

  future: {
    compatibilityVersion: 4,
  },
})
