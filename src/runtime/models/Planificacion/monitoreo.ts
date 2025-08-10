import type { IUsuario } from "../Auth";
import type { IAsignaturaCurricular } from "../Establecimiento";
import type { IUnidad } from "./unidad";

export interface IResumenOAPorAsignatura {
    asignatura: string;
    totalPlanificados: number;
    totalEjecutados: number;
    porcentajeGeneral: number;
}

export interface IContadorEstadisticaPorGrupo {
    estadoId: number;
    count: number;
}

export interface IEstadisticaPorGrupo {
    contadores: IContadorEstadisticaPorGrupo[];
    promedioCobertura: number;
}

export interface IPlanificacionSimple {
    id: number;
    titulo: string;
    cobertura: number;
    usuarioId: number;
    estadoId: number;
    totalAdecuaciones: number;
    usuario: {
        id: number;
        nombre: string;
        segundoNombre?: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
    };
}

export interface IAsignaturaPlanificaciones {
    planificaciones: IPlanificacionSimple[];
    resumenOA: IResumenOAPorAsignatura;
}

export interface IResumenCurso {
    planificacionesPorAsignatura: Record<string, IAsignaturaPlanificaciones> | null;
    estadisticas: IEstadisticaPorGrupo;
}

export interface IMonitoreoCurso {
    resumenAnualCobertura: IResumenCurso | null;
}

export interface IMonitoreoDocente {
    docenteId: number
    docenteNombre: string
    asignaturas: number
    oaPlanificados: number
    oaRealizados: number
    coberturaPromedio: number
}