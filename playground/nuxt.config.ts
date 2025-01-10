export default defineNuxtConfig({
    modules: ['../src/module'],
    ssr: false,
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    redcollege: {
        baseURL: 'http://localhost:3334/api/v3',
        socketURL: 'http://localhost:3334',
        logoURL: 'https://redcollege.nyc3.digitaloceanspaces.com/docs/components/planificaciones-logo.svg',
        nombreModulo: 'Planificaciones',
        redirectTo: 'mis-planificaciones',
        redirectToAdmin: 'socket',
        shouldRedirect: true
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-08-16',
})
