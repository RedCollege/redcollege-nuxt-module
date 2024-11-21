import defu from 'defu'
import { defineNuxtModule, addLayout, addPlugin, addTemplate, addComponentsDir, createResolver, installModule, addImportsDir } from '@nuxt/kit'
// Module options TypeScript interface definition
export interface ModuleOptions {
    baseURL: string;
    logoURL: string;
    nombreModulo: string;
    shouldRedirect: boolean;
    redirectTo: string;
    redirectToAdmin: string;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@redcollege/ui-nuxt-module',
        configKey: 'redcollege',
    },
    // Default configuration options of the Nuxt module
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)
        nuxt.options.runtimeConfig.public.redcollege = defu(nuxt.options.runtimeConfig.public.redcollege, {
            baseURL: options.baseURL,
            logoURL: options.logoURL,
            nombreModulo: options.nombreModulo,
            redirectTo: options.redirectTo,
            redirectToAdmin: options.redirectToAdmin,
            shouldRedirect: options.shouldRedirect
        })

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))
        addPlugin(resolver.resolve('./runtime/plugins/lucide'))
        addPlugin(resolver.resolve('./runtime/plugins/vue-table'))
        addPlugin(resolver.resolve('./runtime/plugins/middleware'))
        addPlugin(resolver.resolve('./runtime/plugins/api'))
        addPlugin(resolver.resolve('./runtime/plugins/form'))

        addComponentsDir({
            path: resolver.resolve('runtime/components')
        })
        await installModule('@nuxtjs/tailwindcss', {
            cssPath: resolver.resolve('./runtime/assets/tailwind.css'),
            configPath: resolver.resolve('./runtime/tailwind.config.js'),
            exposeConfig: true,
            config: {
                content: [
                    resolver.resolve('runtime/components/**/*.{vue,js,ts}'),
                    resolver.resolve('runtime/**/*.{vue,js,ts}')
                ],
                important: true
            }
        })

        await installModule('@vueuse/nuxt')
        await installModule('@vueuse/motion/nuxt')

        await installModule('@vee-validate/nuxt')

        await installModule('shadcn-nuxt', {
            componentDir: resolver.resolve('runtime/components/ui')
        })
        await installModule('@pinia/nuxt', {
            storesDirs: [resolver.resolve('runtime/stores/**')]
        })

        await installModule('@formkit/auto-animate/nuxt')

        addPlugin(resolver.resolve('./runtime/plugins/auth'))

        await installModule('nuxt-icon-tw')
        await installModule('@nuxt/icon', {
            serverBundle: {
                collections: ['tabler']
            }
        })
        addImportsDir(resolver.resolve('runtime/composables'))
        addLayout(resolver.resolve('runtime/layouts', 'dashboard.vue'), 'dashboard')

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

        nuxt.options.build.transpile.push('zod', '@vee-validate/zod')

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

    },
})

export * from './runtime/types'
