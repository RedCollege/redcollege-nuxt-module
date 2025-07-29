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
        shouldRedirect: true,
        postHogApiKey: process.env.POSTHOG_API_KEY,
        postHogApiHost: process.env.POSTHOG_API_HOST,
        prismicEndPoint: process.env.PRISMIC_END_POINT
    },
    devtools: { enabled: true },
    compatibilityDate: '2024-08-16',
})
