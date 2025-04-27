import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',  // Asegúrate de que el entorno sea jsdom
    alias: {
      '~': resolve(__dirname, 'src'), // Esto es importante para el alias de Nuxt
    },
    globals: true,  // Necesario para el entorno de test de Vue
  },
})
