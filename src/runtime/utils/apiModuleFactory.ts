import type { $Fetch } from 'ofetch';
import PlanificacionModule from '../repository/modules/planificaciones/planificacion';
import InformesModule from '../repository/modules/informes/informes';
import UnidadModule from '../repository/modules/planificaciones/unidad';
import EstablecimientoModule from '../repository/modules/establecimiento/establecimiento';
import CursoModule from '../repository/modules/establecimiento/curso';
import AsignaturaCurricularModule from '../repository/modules/establecimiento/asignaturas_curriculares';
import PeriodoEscolarModule from '../repository/modules/establecimiento/periodo_escolar';
import MatriculaModule from '../repository/modules/matricula/matricula';
import { ItemEntradaCurricularModule } from '../repository/modules';
import AuxiliarModule from '../repository/modules/general/auxiliar';
import HealthModule from '../repository/modules/health/health';

export type PlanificacionesModules = {
    planificacion: PlanificacionModule;
    unidades: UnidadModule
};

export type MatriculasModules = {
    matricula: MatriculaModule
}

export type CurriculumModules = {
    itemEntradaCurricular: ItemEntradaCurricularModule
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

export type GeneralModules = {
    auxiliar: AuxiliarModule
}

export type HealthModules = {
    health: HealthModule
}

// agrupación de modulos
export type ApiModules = {
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
    establecimiento: EstablecimientoModules;
    matriculas: MatriculasModules;
    curriculum: CurriculumModules;
    general: GeneralModules;
    health: HealthModules;
};

export function createApiModules(apiType: 'planificaciones'
                                        | 'informes'
                                        | 'establecimiento'
                                        | 'matriculas'
                                        | 'curriculum'
                                        | 'general'
                                        | 'health'
                                        , apiFetcher: $Fetch): PlanificacionesModules | InformesModules | EstablecimientoModules | MatriculasModules | CurriculumModules | GeneralModules | HealthModules {
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
        case 'curriculum':
            return {
                itemEntradaCurricular: new ItemEntradaCurricularModule(apiFetcher)
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
        case 'general':
            return {
                auxiliar: new AuxiliarModule(apiFetcher)
            };
        case 'health':
            return{
                health: new HealthModule(apiFetcher)
            }
    }
}
