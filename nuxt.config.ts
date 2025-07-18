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
    buildAssetsDir: '/static/',
    head: {
      title: '覚エル-日本語能力學習工具',
      meta: [
        { name: 'description', content: '背單字最方便的日語學習工具！支援 N1～N5 分類與收藏功能。' },
      ],
    }
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