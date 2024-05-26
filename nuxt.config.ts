import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/core',
  extends: [
    './src/core/',
    './src/modules/home',
    './src/modules/control',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@unocss/nuxt',
    'nitro-cloudflare-dev',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],
  nitro: {
    experimental: {
      websocket: true
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})