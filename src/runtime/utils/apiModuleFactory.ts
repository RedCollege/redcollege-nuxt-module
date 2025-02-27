import type { $Fetch } from "ofetch";
import PlanificacionModule from "../repository/modules/planificaciones/planificacion";
import InformesModule from "../repository/modules/informes/informes";
import UnidadModule from "../repository/modules/planificaciones/unidad";
import EstablecimientoModule from "../repository/modules/establecimiento/establecimiento";
import CursoModule from "../repository/modules/establecimiento/curso";
import AsignaturaCurricularModule from "../repository/modules/establecimiento/asignaturas_curriculares";
import PeriodoEscolarModule from "../repository/modules/establecimiento/periodo_escolar";
import MatriculaModule from "../repository/modules/matricula/matricula";
import {
    EspecialidadModule,
    GrupoModule,
    ItemEntradaCurricularModule,
    RegistroAtencionModule,
    UsuarioModule,
    AntecedentePersonalModule,
} from "../repository/modules";
import AuxiliarModule from "../repository/modules/general/auxiliar";
import ContenidoModule from "../repository/modules/planificaciones/contenido";
import ContenidoActividadModule from "../repository/modules/planificaciones/contenido_actividad";
import ContenidoRecursoModule from "../repository/modules/planificaciones/contenido_recurso";
import HealthModule from "../repository/modules/health/health";
import RegistroDuaModule from "../repository/modules/planificaciones/dua/registro_dua";
import AdecuacionCurricularModule from "../repository/modules/planificaciones/adecuacion_curricular";
import AdjuntoModule from "../repository/modules/comunicacion/adjunto";
import MensajeModule from "../repository/modules/comunicacion/mensaje";
import UsuarioMensajeModule from "../repository/modules/comunicacion/usuario_mensaje";
import LugarModule from "../repository/modules/enfermeria/lugar";
import TratamientoModule from "../repository/modules/enfermeria/tratamiento";
import MotivoAtencionModule from "../repository/modules/enfermeria/motivo_atencion";
export type AuthModules = {
    usuario: UsuarioModule;
};

export type PlanificacionesModules = {
    planificacion: PlanificacionModule;
    unidades: UnidadModule;
    contenidos: ContenidoModule;
    contenidoActividades: ContenidoActividadModule;
    contenidoRecursos: ContenidoRecursoModule;
    registroDua: RegistroDuaModule;
    adecuacionCurricular: AdecuacionCurricularModule;
};

export type MatriculasModules = {
    matricula: MatriculaModule;
};

export type CurriculumModules = {
    itemEntradaCurricular: ItemEntradaCurricularModule;
};

export type InformesModules = {
    informes: InformesModule;
};

export type EstablecimientoModules = {
    establecimiento: EstablecimientoModule;
    curso: CursoModule;
    asignaturaCurricular: AsignaturaCurricularModule;
    periodoEscolar: PeriodoEscolarModule;
    especialidad: EspecialidadModule;
};

export type GeneralModules = {
    auxiliar: AuxiliarModule;
};

export type HealthModules = {
    health: HealthModule;
};

export type ComunicacionesModules = {
    adjunto: AdjuntoModule;
    mensaje: MensajeModule;
    usuarioMensaje: UsuarioMensajeModule;
    grupo: GrupoModule;
};

export type EnfermeriaModules = {
    registroAtencion: RegistroAtencionModule;
    lugar: LugarModule;
    tratamiento: TratamientoModule;
    motivo: MotivoAtencionModule;
    antecedentePersonal: AntecedentePersonalModule;
};

// agrupación de modulos
export type ApiModules = {
    auth: AuthModules;
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
    establecimiento: EstablecimientoModules;
    matriculas: MatriculasModules;
    curriculum: CurriculumModules;
    general: GeneralModules;
    health: HealthModules;
    comunicaciones: ComunicacionesModules;
    enfermeria: EnfermeriaModules;
};

export function createApiModules(
    apiType:
        | "auth"
        | "planificaciones"
        | "informes"
        | "establecimiento"
        | "matriculas"
        | "curriculum"
        | "general"
        | "health"
        | "comunicaciones"
        | "enfermeria",
    apiFetcher: $Fetch
):
    | AuthModules
    | PlanificacionesModules
    | InformesModules
    | EstablecimientoModules
    | MatriculasModules
    | CurriculumModules
    | GeneralModules
    | HealthModules
    | ComunicacionesModules
    | EnfermeriaModules {
    switch (apiType) {
        case "auth":
            return {
                usuario: new UsuarioModule(apiFetcher),
            };
        case "planificaciones":
            return {
                planificacion: new PlanificacionModule(apiFetcher),
                unidades: new UnidadModule(apiFetcher),
                contenidos: new ContenidoModule(apiFetcher),
                contenidoActividades: new ContenidoActividadModule(apiFetcher),
                contenidoRecursos: new ContenidoRecursoModule(apiFetcher),
                registroDua: new RegistroDuaModule(apiFetcher),
                adecuacionCurricular: new AdecuacionCurricularModule(
                    apiFetcher
                ),
            };
        case "matriculas":
            return {
                matricula: new MatriculaModule(apiFetcher),
            };
        case "curriculum":
            return {
                itemEntradaCurricular: new ItemEntradaCurricularModule(
                    apiFetcher
                ),
            };
        case "informes":
            return {
                informes: new InformesModule(apiFetcher),
                // ... inicializar otros submódulos de informes
            };
        case "establecimiento":
            return {
                periodoEscolar: new PeriodoEscolarModule(apiFetcher),
                establecimiento: new EstablecimientoModule(apiFetcher),
                curso: new CursoModule(apiFetcher),
                asignaturaCurricular: new AsignaturaCurricularModule(
                    apiFetcher
                ),
                especialidad: new EspecialidadModule(apiFetcher),
                // ... inicializar otros submódulos de establecimiento
            };
        case "general":
            return {
                auxiliar: new AuxiliarModule(apiFetcher),
            };
        case "health":
            return {
                health: new HealthModule(apiFetcher),
            };
        case "comunicaciones":
            return {
                adjunto: new AdjuntoModule(apiFetcher),
                mensaje: new MensajeModule(apiFetcher),
                usuarioMensaje: new UsuarioMensajeModule(apiFetcher),
                grupo: new GrupoModule(apiFetcher),
            };
        case "enfermeria":
            return {
                registroAtencion: new RegistroAtencionModule(apiFetcher),
                lugar: new LugarModule(apiFetcher),
                tratamiento: new TratamientoModule(apiFetcher),
                motivo: new MotivoAtencionModule(apiFetcher),
                antecedentePersonal: new AntecedentePersonalModule(apiFetcher),
            };
    }
}
