// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vee-validate/nuxt', '@pinia/nuxt', 'nuxt-icon'],

  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    fallback: 'light',
    classSuffix: '',
  },
});
