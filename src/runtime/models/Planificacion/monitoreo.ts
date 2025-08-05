import type { IUsuario } from "../Auth";
import type { IAsignaturaCurricular } from "../Establecimiento";
import type { IUnidad } from "./unidad";

export interface IResumenOA {
    planificacionId: number;
    totalPlanificados: number;
    totalEjecutados: number;
    porcentajeGeneral: number;
}

// Interfaces para contadores y estadísticas
export interface IContadorEstadisticaPorGrupo {
    estadoId: number;
    count: number;
}

export interface IEstadisticaPorGrupo {
    contadores: IContadorEstadisticaPorGrupo[];
    promedioCobertura: number;
}

// Interface para planificación extendida con adecuaciones y resumen OA
export interface IPlanificacionPorAsignatura {
    id: number;
    titulo: string;
    cobertura: number;
    usuarioId: number;
    estadoId: number;
    totalAdecuaciones: number;
    resumenOA?: IResumenOA;
    usuario?: IUsuario;
    unidades?: IUnidad[];
    asignaturas?: IAsignaturaCurricular[];
}

// Interface principal del resumen del curso
export interface IResumenCurso {
    planificacionesPorAsignatura: Record<string, IPlanificacionPorAsignatura[]> | null;
    estadisticas: IEstadisticaPorGrupo;
}

// Interface para el retorno de getMonitoreoCurso
export interface IMonitoreoCurso {
    resumenAnualCobertura: IResumenCurso | null;
}

// Interface para los datos de cobertura por unidad
export interface ICoberturaPorUnidad {
    planificacionId: number;
    unidadId: number;
    ejecutados: number;
    planificados: number;
    porcentajeCumplimiento: number;
}