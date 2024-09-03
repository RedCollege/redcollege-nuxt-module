import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import type { FetchOptions, $Fetch } from 'ofetch';
import { createApiModules } from '../utils/apiModuleFactory';
import type { ApiModules, PlanificacionesModules, InformesModules } from '../utils/apiModuleFactory';

// Definir tipos de API
type ApiType = 'planificaciones' | 'informes';

export default defineNuxtPlugin((nuxtApp) => {
    const { baseURL } = useRuntimeConfig().public.redcollege
    const fetchOptions: FetchOptions = {
        baseURL: baseURL, // URL base común para todas las APIs
    };

    const apiFetcher = $fetch.create(fetchOptions) as $Fetch;

    const apis: ApiModules = {
        planificaciones: createApiModules('planificaciones', apiFetcher) as PlanificacionesModules,
        informes: createApiModules('informes', apiFetcher) as InformesModules,
    };

    return {
        provide: {
            apis,
        },
    };
});

// Declarar los tipos globales para que estén disponibles en toda la aplicación
declare module '#app' {
    interface NuxtApp {
        $apis: ApiModules;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $apis: ApiModules;
    }
}
