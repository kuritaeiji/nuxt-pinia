// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: { title: 'nuxt-pinia' }
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: ['defineStore']
  }
})
