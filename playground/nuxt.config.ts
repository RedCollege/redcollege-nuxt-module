export default defineNuxtConfig({
    modules: ['../src/module'],
    ssr: false,
    redcollege: {
        baseURL: 'http://localhost:3334/api/v3',
        logoURL: 'https://redcollege.nyc3.digitaloceanspaces.com/docs/components/planificaciones-logo.svg',
        nombreModulo: 'Planificaciones',
        redirectTo: 'mis-planificaciones'
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-08-16',
})
