import type { $Fetch } from 'ofetch';
import  PlanificacionModule  from '../repository/modules/planificaciones/planificacion';
import  InformesModule  from '../repository/modules/informes/informes';

export type PlanificacionesModules = {
    planificacion: PlanificacionModule;

    // ... otros submódulos de planificaciones
};

export type InformesModules = {
    informes: InformesModule;

    // ... otros submódulos de informes
};

export type ApiModules = {
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
};

export function createApiModules(apiType: 'planificaciones' | 'informes', apiFetcher: $Fetch): PlanificacionesModules | InformesModules {
    if (apiType === 'planificaciones') {
        return {
            planificacion: new PlanificacionModule(apiFetcher),

            // ... inicializar otros submódulos de planificaciones
        };
    } else {
        return {
            informes: new InformesModule(apiFetcher),

            // ... inicializar otros submódulos de informes
        };
    }
}
