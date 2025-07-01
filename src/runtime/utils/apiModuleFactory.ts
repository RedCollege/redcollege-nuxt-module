import type { $Fetch } from "ofetch";
import PlanificacionModule from "../repository/modules/planificaciones/planificacion";
import InformesModule from "../repository/modules/informes/informes";
import UnidadModule from "../repository/modules/planificaciones/unidad";
import EstablecimientoModule from "../repository/modules/establecimiento/establecimiento";
import CursoModule from "../repository/modules/establecimiento/curso";
import AsignaturaCurricularModule from "../repository/modules/establecimiento/asignaturas_curriculares";
import PeriodoEscolarModule from "../repository/modules/establecimiento/periodo_escolar";
import MatriculaModule from "../repository/modules/matricula/matricula";
import EstadisticaModule from "../repository/modules/enfermeria/estadistica";
import {
    EspecialidadModule,
    EvaluacionCursoModule,
    GrupoModule,
    ItemEntradaCurricularModule,
    RegistroAtencionModule,
    PermisoModule,
    UsuarioModule,
    AntecedenteSaludModule,
    SimceEstablecimientoModule,
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
import EnfermedadDiscapacidadModule from "../repository/modules/enfermeria/enfermedad_discapacidad";
import SistemaPlantillaModule from "../repository/modules/comunicacion/sistema_plantilla";
import UsuarioPlantillaModule from "../repository/modules/comunicacion/usuario_plantilla";
import MarcadorModule from "../repository/modules/planificaciones/marcador";
import ConfiguracionItemModule from "../repository/modules/enfermeria/configuracion_item";
import RegistroAccidenteModule from "../repository/modules/enfermeria/registro_accidente";
import HorarioModule from "../repository/modules/curso/horario/horario";
import HorarioDiaAsignaturaModule from "../repository/modules/curso/horario/horario_dia_asignatura";
import ActividadModule from "../repository/modules/enfermeria/actividad";
import AdministracionMedicamentosModule from "../repository/modules/enfermeria/administracion_medicamento";
import CursoAsignaturaCurricularModule from "../repository/modules/establecimiento/curso_asignatura_curricular";

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
    marcadores: MarcadorModule;
};

export type MatriculasModules = {
    matricula: MatriculaModule;
    antecedenteSalud: AntecedenteSaludModule;
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
    cursoAsignaturaCurricular: CursoAsignaturaCurricularModule;
    asignaturaCurricular: AsignaturaCurricularModule;
    periodoEscolar: PeriodoEscolarModule;
    especialidad: EspecialidadModule;
};

export type HorarioModules = {
    horario: HorarioModule;
    horarioDiaAsignatura: HorarioDiaAsignaturaModule;
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
    permiso: PermisoModule;
    usuarioPlantilla: UsuarioPlantillaModule;
    sistemaPlantilla: SistemaPlantillaModule;
};

export type EnfermeriaModules = {
    registroAtencion: RegistroAtencionModule;
    antecedenteSalud: AntecedenteSaludModule;
    enfermedadDiscapacidad: EnfermedadDiscapacidadModule;
    configuracionItem: ConfiguracionItemModule;
    registroAccidente: RegistroAccidenteModule;
    estadistica: EstadisticaModule;
    administracionMedicamentos: AdministracionMedicamentosModule;
    actividad: ActividadModule;
};

export type EvaluacionesModules = {
    evaluacionCurso: EvaluacionCursoModule;
    simceEstablecimiento: SimceEstablecimientoModule;
};

// agrupación de modulos
export type ApiModules = {
    auth: AuthModules;
    planificaciones: PlanificacionesModules;
    informes: InformesModules;
    establecimiento: EstablecimientoModules;
    matriculas: MatriculasModules;
    enfermeria: EnfermeriaModules;
    curriculum: CurriculumModules;
    general: GeneralModules;
    health: HealthModules;
    comunicaciones: ComunicacionesModules;
    evaluaciones: EvaluacionesModules;
    horario: HorarioModules;
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
        | "enfermeria"
        | "evaluaciones"
        | "horario",
    apiFetcher: $Fetch,
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
    | EnfermeriaModules
    | EvaluacionesModules
    | HorarioModules {
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
                marcadores: new MarcadorModule(apiFetcher),
                adecuacionCurricular: new AdecuacionCurricularModule(
                    apiFetcher,
                ),
            };
        case "matriculas":
            return {
                matricula: new MatriculaModule(apiFetcher),
                antecedenteSalud: new AntecedenteSaludModule(apiFetcher),
            };
        case "curriculum":
            return {
                itemEntradaCurricular: new ItemEntradaCurricularModule(
                    apiFetcher,
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
                cursoAsignaturaCurricular: new CursoAsignaturaCurricularModule(
                    apiFetcher,
                ),
                curso: new CursoModule(apiFetcher),
                asignaturaCurricular: new AsignaturaCurricularModule(
                    apiFetcher,
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
                permiso: new PermisoModule(apiFetcher),
                usuarioPlantilla: new UsuarioPlantillaModule(apiFetcher),
                sistemaPlantilla: new SistemaPlantillaModule(apiFetcher),
            };
        case "enfermeria":
            return {
                registroAtencion: new RegistroAtencionModule(apiFetcher),
                antecedenteSalud: new AntecedenteSaludModule(apiFetcher),
                enfermedadDiscapacidad: new EnfermedadDiscapacidadModule(
                    apiFetcher,
                ),
                configuracionItem: new ConfiguracionItemModule(apiFetcher),
                registroAccidente: new RegistroAccidenteModule(apiFetcher),
                estadistica: new EstadisticaModule(apiFetcher),
                administracionMedicamentos:
                    new AdministracionMedicamentosModule(apiFetcher),
                actividad: new ActividadModule(apiFetcher),
            };
        case "evaluaciones":
            return {
                evaluacionCurso: new EvaluacionCursoModule(apiFetcher),
                simceEstablecimiento: new SimceEstablecimientoModule(
                    apiFetcher,
                ),
            };
        case "horario":
            return {
                horario: new HorarioModule(apiFetcher),
                horarioDiaAsignatura: new HorarioDiaAsignaturaModule(
                    apiFetcher,
                ),
            };
    }
}
