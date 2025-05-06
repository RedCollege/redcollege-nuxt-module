// runtime/plugins/favicon.ts
import type { ModuleOptions } from '../../module'
import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

export default defineNuxtPlugin({
    name: 'favicon-plugin',
    enforce: 'pre', // Asegura que se ejecute antes que otros plugins
    setup(nuxtApp) {
        const config = useRuntimeConfig()
        const redcollegeConfig = config.public.redcollege as ModuleOptions

        // Comprobamos que existe logoURL
        if (!redcollegeConfig.logoURL) {
            console.warn('No se ha proporcionado logoURL para generar el favicon')
            return
        }

        // Función para establecer el favicon
        const setFavicon = (): void => {
            // Si la URL del logo ya es un .ico, la usamos directamente
            if (redcollegeConfig.logoURL.endsWith('.ico')) {
                useHead({
                    link: [
                        {
                            rel: 'icon',
                            type: 'image/x-icon',
                            href: redcollegeConfig.logoURL
                        }
                    ]
                })
                return
            }

            // Si es otra imagen (como PNG o SVG), la usamos como favicon
            // Detectamos el tipo basado en la extensión
            const extension: string = redcollegeConfig.logoURL.split('.').pop()?.toLowerCase() || ''
            let mimeType: string = 'image/x-icon' // Valor por defecto

            switch (extension) {
                case 'png':
                    mimeType = 'image/png'
                    break
                case 'svg':
                    mimeType = 'image/svg+xml'
                    break
                case 'jpg':
                case 'jpeg':
                    mimeType = 'image/jpeg'
                    break
                // Añade más tipos según sea necesario
            }

            useHead({
                link: [
                    {
                        rel: 'icon',
                        type: mimeType,
                        href: redcollegeConfig.logoURL
                    }
                ]
            })
        }

        // Establecemos el favicon cuando la app se inicia
        nuxtApp.hook('app:created', () => {
            setFavicon()
        })
    }
})
