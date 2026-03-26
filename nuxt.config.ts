// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/hints', '@nuxt/image', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'Nurmuhammad — Web Developer' },
        { name: 'theme-color', content: '#00e5cc' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'preload',
          as: 'style',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
          onload: "this.onload=null;this.rel='stylesheet'",
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['gsap'],
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'uz', name: "O'zbekcha", file: 'uz.json' },
    ],
    lazy: true,
  },
})
