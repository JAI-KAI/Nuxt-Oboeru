// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',  
    fallback: 'dark',    
    classSuffix: '', 
  },
  ui: {
    colorMode: true,     
  },
  app: {
    baseURL: "/Nuxt-Oboeru/", // GitHub Pages 需要設定 baseURL
    buildAssetsDir: '/static/'
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/',
        'about'
      ] // 預渲染首頁
    },
  },
})