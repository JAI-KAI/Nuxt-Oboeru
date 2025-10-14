// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],
  css: [
    '~/assets/css/main.css',
  ],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
  ui: {
    colorMode: true,
  },
  app: {
    baseURL: "/", // Vercel 預設 根目錄
    buildAssetsDir: '/_nuxt/', // 預設
    head: {
      title: '覚エル-日本語單字學習網站',
      meta: [
        { name: 'description', content: '背單字最方便的日語學習工具！支援 N1～N5 分類與收藏功能。' },
        { name: 'keywords', content: 'JLPT, 日語, 單字, 測驗, N1, N2, N3, N4, N5' },
        { property: 'og:title', content: '覚エル-日本語單字學習網站' },
        { property: 'og:description', content: '幫助日語學習者更有效率記憶 JLPT 單字' },
        { property: 'og:type', content: 'website' }
      ],
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        'about'
      ] // 預渲染首頁
    },
  },
})