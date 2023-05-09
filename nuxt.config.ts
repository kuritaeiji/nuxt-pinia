// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: { title: 'nuxt-pinia' }
  },
  srcDir: 'src/',
  modules: ['@pinia/nuxt', '@vee-validate/nuxt'],
  pinia: {
    autoImports: ['defineStore']
  }
})
