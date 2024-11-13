import type { $Fetch } from 'ofetch';
import PlanificacionModule from '../repository/modules/planificaciones/planificacion';
import InformesModule from '../repository/modules/informes/informes';
import UnidadModule from '../repository/modules/planificaciones/unidad';
import EstablecimientoModule from '../repository/modules/establecimiento/establecimiento';
import CursoModule from '../repository/modules/establecimiento/curso';
import AsignaturaCurricularModule from '../repository/modules/establecimiento/asignaturas_curriculares';
import PeriodoEscolarModule from '../repository/modules/establecimiento/periodo_escolar';
import MatriculaModule from '../repository/modules/matricula/matricula';

export type PlanificacionesModules = {
    planificacion: PlanificacionModule;
    unidades: UnidadModule
};

export type MatriculasModules = {
    matricula: MatriculaModule
}

export type InformesModules = {
    informes: InformesModule;
};

export type EstablecimientoModules = {
    establecimiento: EstablecimientoModule;
    curso: CursoModule;
    asignaturaCurricular: AsignaturaCurricularModule,
    periodoEscolar: PeriodoEscolarModule
};


// agrupación de modulos
export type ApiModules = {
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
    establecimiento: EstablecimientoModules;
    matriculas: MatriculasModules
};

export function createApiModules(apiType: 'planificaciones' | 'informes' | 'establecimiento' | 'matriculas', apiFetcher: $Fetch): PlanificacionesModules | InformesModules | EstablecimientoModules | MatriculasModules {
    switch (apiType) {
        case 'planificaciones':
            return {
                planificacion: new PlanificacionModule(apiFetcher),
                unidades: new UnidadModule(apiFetcher)
                // ... inicializar otros submódulos de planificaciones
            };
        case 'matriculas':
            return {
                matricula: new MatriculaModule(apiFetcher)
            };
        case 'informes':
            return {
                informes: new InformesModule(apiFetcher),
                // ... inicializar otros submódulos de informes
            };
        case 'establecimiento':
            return {
                periodoEscolar: new PeriodoEscolarModule(apiFetcher),
                establecimiento: new EstablecimientoModule(apiFetcher),
                curso: new CursoModule(apiFetcher),
                asignaturaCurricular: new AsignaturaCurricularModule(apiFetcher)
                // ... inicializar otros submódulos de establecimiento
            };

    }
}
