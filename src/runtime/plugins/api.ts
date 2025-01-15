import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import type { FetchOptions, $Fetch } from 'ofetch';
import { createApiModules } from '../utils/apiModuleFactory';
import type { ApiModules, InformesModules, PlanificacionesModules, HealthModules, EstablecimientoModules, MatriculasModules, CurriculumModules, GeneralModules, AuthModules, ComunicacionesModules, EnfermeriaModules } from '../utils/apiModuleFactory';
import { useAuthStore } from '../stores/authStore';

export default defineNuxtPlugin((nuxtApp) => {
    const { baseURL } = useRuntimeConfig().public.redcollege

    const apiFetcher = $fetch.create({
        baseURL,
        async onRequest({ options }) {
            options.headers = {
                ...options.headers,
                Authorization: useAuthStore().bearerToken
            }
        }
    }) as $Fetch;

    const apis: ApiModules = {
        auth: createApiModules('auth', apiFetcher) as AuthModules,
        planificaciones: createApiModules('planificaciones', apiFetcher) as PlanificacionesModules,
        informes: createApiModules('informes', apiFetcher) as InformesModules,
        establecimiento: createApiModules('establecimiento', apiFetcher) as EstablecimientoModules,
        matriculas: createApiModules('matriculas', apiFetcher) as MatriculasModules,
        curriculum: createApiModules('curriculum', apiFetcher) as CurriculumModules,
        general: createApiModules('general', apiFetcher) as GeneralModules,
        health: createApiModules('health', apiFetcher) as HealthModules,
        comunicaciones: createApiModules('comunicaciones', apiFetcher) as ComunicacionesModules,
        enfermeria: createApiModules('enfermeria', apiFetcher) as EnfermeriaModules,
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
