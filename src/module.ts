import defu from 'defu'
import { defineNuxtModule, addLayout, addPlugin, addTemplate, addComponentsDir, createResolver, installModule, addImportsDir } from '@nuxt/kit'
import { readdirSync } from 'fs';
// Module options TypeScript interface definition
export interface ModuleOptions {
    baseURL: string;
    socketURL: string;
    rollbarToken?: string;
    logoURL: string;
    nombreModulo: string;
    shouldRedirect: boolean;
    redirectTo: string;
    redirectToAdmin: string;
    postHogApiKey?: string;
    postHogApiHost?: string;
    prismicEndPoint?: string;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@redcollege/ui-nuxt-module',
        configKey: 'redcollege'
    },
    // Default configuration options of the Nuxt module
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)
        const pagesDir = resolver.resolve('./runtime/pages')

        nuxt.options.vite = {
            optimizeDeps: {
                include: ['quill', '@enzedonline/quill-blot-formatter2', '@unovis/ts', '@unovis/vue']
            }
        }

        nuxt.options.runtimeConfig.public.redcollege = defu(nuxt.options.runtimeConfig.public.redcollege, {
            baseURL: options.baseURL,
            socketURL: options.socketURL,
            logoURL: options.logoURL,
            nombreModulo: options.nombreModulo,
            redirectTo: options.redirectTo,
            redirectToAdmin: options.redirectToAdmin,
            shouldRedirect: options.shouldRedirect,
            rollbarToken: options.rollbarToken,
            postHogApiKey: options.postHogApiKey,
            postHogApiHost: options.postHogApiHost,
            prismicEndPoint: options.prismicEndPoint
        })

        try {
            readdirSync(pagesDir)
        } catch (error) {
            console.warn(`Directory ${pagesDir} does not exist. Skipping page generation.`)
            return
        }

        nuxt.hook('pages:extend', (pages) => {
            const items = readdirSync(pagesDir, { withFileTypes: true })

            function addPagesRecursively(dir: string, basePath: string = '') {
                const items = readdirSync(dir, { withFileTypes: true })
                const currentLevelPages: any[] = []

                // Primero procesar archivos .vue en el nivel actual
                items.forEach(item => {
                    const fullPath = `${dir}/${item.name}`
                    if (!item.isDirectory() && item.name.endsWith('.vue')) {
                        const routeName = item.name.replace('.vue', '').toLowerCase()
                        const fullRouteName = `${basePath}/${routeName}`.substring(1)

                        currentLevelPages.push({
                            name: fullRouteName.replace(/\//g, '-'),
                            path: `${basePath}/${routeName}`,
                            file: fullPath,
                            children: []
                        })
                    }
                })

                // Luego procesar subdirectorios
                items.forEach(item => {
                    const fullPath = `${dir}/${item.name}`
                    if (item.isDirectory()) {
                        // Buscar si existe una página padre para este directorio
                        const parentPage = currentLevelPages.find(
                            page => page.name === item.name || page.path.endsWith(item.name)
                        )

                        const childBasePath = `${basePath}/${item.name}`
                        const childPages = addPagesRecursively(fullPath, childBasePath)

                        if (parentPage) {
                            // Si existe página padre, agregar páginas hijas como children
                            parentPage.children.push(...childPages)
                        } else {
                            // Si no hay página padre, agregar páginas al nivel actual
                            currentLevelPages.push(...childPages)
                        }
                    }
                })

                return currentLevelPages
            }

            const generatedPages = addPagesRecursively(pagesDir)
            pages.push(...generatedPages)
        })

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugins/auth'))
        addPlugin(resolver.resolve('./runtime/plugin'))
        addPlugin(resolver.resolve('./runtime/plugins/lucide'))
        addPlugin(resolver.resolve('./runtime/plugins/vue-table'))
        addPlugin(resolver.resolve('./runtime/plugins/middleware'))
        addPlugin(resolver.resolve('./runtime/plugins/api'))
        addPlugin(resolver.resolve('./runtime/plugins/form'))
        addPlugin(resolver.resolve('./runtime/plugins/favicon'))

        addComponentsDir({
            path: resolver.resolve('runtime/components')
        })

        await installModule('nuxt-rollbar', {
            clientAccessToken: options.rollbarToken
        })

        await installModule('@nuxtjs/prismic', {
            endpoint: options.prismicEndPoint
        })

        await installModule('nuxt-posthog', {
            publicKey: options.postHogApiKey,
            host: options.postHogApiHost
        })

        // Configuración de Tailwind v4 con Vite plugin
        nuxt.hook('vite:extend', async ({ config }) => {
            config.plugins = config.plugins || []
            const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m)
            config.plugins.push(tailwindcss())
        })

        // Agregar el CSS de Tailwind
        nuxt.options.css.push(resolver.resolve('./runtime/assets/tailwind.css'))

        await installModule('motion-v/nuxt')

        await installModule('@vee-validate/nuxt')

        await installModule('shadcn-nuxt', {
            componentDir: resolver.resolve('runtime/components/ui')
        })
        await installModule('@pinia/nuxt', {
            storesDirs: [resolver.resolve('runtime/stores/**')]
        })

        await installModule('@formkit/auto-animate/nuxt')

        await installModule('nuxt-icon-tw')
        await installModule('@nuxt/icon', {
            serverBundle: {
                collections: ['tabler']
            }
        })

        addImportsDir(resolver.resolve('runtime/composables'))
        addLayout(resolver.resolve('runtime/layouts', 'dashboard.vue'), 'dashboard')
        addLayout(resolver.resolve('runtime/layouts', 'settings.vue'), 'settings')
        addLayout(resolver.resolve('runtime/layouts', 'superadmin.vue'), 'superadmin')

        addTemplate({
            filename: 'types/redcollege-ui.d.ts',
            getContents: () => `
                declare module '@redcollege/ui-nuxt-module' {
                    export * from '${resolver.resolve('./runtime/models')}'
                }
            `
        })

        // Asegúrate de que Nuxt incluya los tipos en la compilación
        nuxt.options.alias['@redcollege/ui-nuxt-module'] = resolver.resolve('.')
        nuxt.options.build.transpile.push('@redcollege/ui-nuxt-module')

        nuxt.options.build.transpile.push('zod', '@vee-validate/zod', 'quill', 'vue-quilly', 'quill-delta')

        // Añadir auto-imports para zod y @vee-validate/zod
        nuxt.options.imports.imports = nuxt.options.imports.imports || []
        nuxt.options.imports.imports.push(
            { from: 'zod', name: 'z' },
            { from: '@vee-validate/zod', name: 'toTypedSchema' }
        )

        // Añadir los tipos al array de tipos de Nuxt
        nuxt.hook('prepare:types', ({ references }) => {
            references.push({ path: resolver.resolve(nuxt.options.buildDir, 'types/redcollege-ui.d.ts') })
        })

        nuxt.options.css.push(resolver.resolve('./runtime/assets/style.css'))

    },
})

export * from './runtime/types'