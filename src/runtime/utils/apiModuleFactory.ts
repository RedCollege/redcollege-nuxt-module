import type { $Fetch } from 'ofetch';
import  PlanificacionModule  from '../repository/modules/planificaciones/planificacion';
import  InformesModule  from '../repository/modules/informes/informes';
import  UnidadModule  from '../repository/modules/planificaciones/unidad';
import EstablecimientoModule from '../repository/modules/establecimiento/establecimiento';

export type PlanificacionesModules = {
    planificacion: PlanificacionModule;
    unidades: UnidadModule
    
    // ... otros submódulos de planificaciones
};

export type InformesModules = {
    informes: InformesModule;

    // ... otros submódulos de informes
};

export type EstablecimientoModules = {
    establecimiento: EstablecimientoModule;
};

export type ApiModules = {
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
    establecimiento: EstablecimientoModules;
};

export function createApiModules(apiType: 'planificaciones' | 'informes' | 'establecimiento', apiFetcher: $Fetch): PlanificacionesModules | InformesModules | EstablecimientoModules {
switch (apiType) {
    case 'planificaciones':
        return {
            planificacion: new PlanificacionModule(apiFetcher),
            unidades: new UnidadModule(apiFetcher)
            // ... inicializar otros submódulos de planificaciones
        };
    case 'informes':
        return {
            informes: new InformesModule(apiFetcher),
            // ... inicializar otros submódulos de informes
        };
    case 'establecimiento':
        return {
            establecimiento: new EstablecimientoModule(apiFetcher),
            // ... inicializar otros submódulos de establecimiento
        };
}
    
}
