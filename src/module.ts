import defu from 'defu'
import { defineNuxtModule, addLayout, addPlugin, addTemplate, addComponentsDir, createResolver, installModule, addImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
    baseURL: string;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: '@redcollege/ui-module',
        configKey: 'redcollege',
    },
    // Default configuration options of the Nuxt module
    defaults: {
        baseURL: 'https://api.redcollege.net/api'
    },
    async setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)
        nuxt.options.runtimeConfig.public.redcollege = defu(nuxt.options.runtimeConfig.public.redcollege, {
            baseURL: options.baseURL
        })
        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addPlugin(resolver.resolve('./runtime/plugin'))
        addPlugin(resolver.resolve('./runtime/plugins/lucide'))
        addPlugin(resolver.resolve('./runtime/plugins/vue-table'))
        addComponentsDir({
            path: resolver.resolve('runtime/components')
        })
        await installModule('@nuxtjs/tailwindcss', {
            cssPath: resolver.resolve('./runtime/assets/tailwind.css'),
            configPath: resolver.resolve('./runtime/tailwind.config.js')
        })
        await installModule('shadcn-nuxt', {
            componentDir: resolver.resolve('runtime/components/ui')
        })
        await installModule('@pinia/nuxt', {
            storesDirs: [resolver.resolve('runtime/stores/**')]
        })
        await installModule('@nuxt/icon')
        addImportsDir(resolver.resolve('runtime/composables'))
        addLayout(resolver.resolve('runtime/layouts', 'dashboard.vue'), 'dashboard')
    },
})
