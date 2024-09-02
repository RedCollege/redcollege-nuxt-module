export default defineNuxtConfig({
    modules: ['../src/module'],
    ssr: false,
    redcollege: {
        baseURL: 'http://localhost:3333/api/v3'
    },
    typescript: {
        typeCheck: true,
        tsConfig: {
          extends: '../tsconfig.json'
        }
      },
    devtools: { enabled: true },
    compatibilityDate: '2024-08-16',
})
