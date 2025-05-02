import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  build: {
    transpile: ['@vue/test-utils', 'vitest'], // Asegúrate de que Vitest esté incluido en el transpile
  },
  vite: {
    plugins: [
      // Si usas Vite directamente, asegúrate de tener el plugin de Vue
      require('@vitejs/plugin-vue')(),
    ]
  }
})
