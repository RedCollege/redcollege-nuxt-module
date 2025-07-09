import type { DateTime } from "luxon";

export interface IChartGeneral {
    name: string;
    atenciones: number;
    accidentes: number;
    actividades: number;
}

export interface IChartData {
    label: string;
    value: number;
}

export interface IResumenCard {
    titulo: string;
    ToolTipContenido: string;
    variant?: string;
    progressItems: IResumenBase[];
}

export interface IResumenBase {
    label: string;
    value: number | string;
}

export enum EstadisticaTabNameEnum {
    ATENCIONES = "atencion",
    ACCIDENTES = "accidente",
    ACTIVIDADES = "actividad",
}

export interface IResumenConContexto extends IResumenBase {
    contexto: string;
}

export interface IEstadisticas {
    estadisticasGenerales: IEstadisticasGenerales;
    estadisticasIndividuales: IEstadisticasIndividuales;
}

export interface IEstadisticasGenerales {
    atencion: IAtencionGeneral;
    accidente: IAccidenteGeneral;
    actividad: IActividadGeneral;
    chartData: IChartGeneral[];
}

export interface IAtencionGeneral {
    total: number;
    finalizadas: number;
    abiertas: number;
}

export interface IAccidenteGeneral {
    total: number;
    enTrayecto: number;
    enEstablecimiento: number;
}
export interface IActividadGeneral {
    total: number;
    suspendidas: number;
    programadas: number;
    finalizadas: number;
}

export interface IEstadisticasIndividuales {
    atencion: IAtencionIndividual;
    accidente: IAccidenteIndividual;
    actividad: IActividadIndividual;
}

export interface IAtencionIndividual {
    chartData: IChartData[];
    resumenPorNivel: IResumenBase[];
    resumenPorLugar: IResumenConContexto[];
    resumenPorBloqueHorario: IResumenBase[];
    resumenPorMotivo: IResumenBase[];
    resumenPorDestino: IResumenConContexto[];
    resumenPorTratamiento: IResumenConContexto[];
}

export interface IAccidenteIndividual {
    chartData: IChartData[];
    resumenPorNivel: IResumenBase[];
    resumenPorGravedad: IResumenConContexto[];
    resumenPorLugar: IResumenConContexto[];
    resumenPorBloqueHorario: IResumenBase[];
}
export interface IActividadIndividual {
    chartData: IChartData[];
    resumenPorTipoActividad: IResumenConContexto[];
    resumenPorResponsable: IResumenBase[];
    resumenPorParticipante: IResumenBase[];
    resumenPorLugar: IResumenConContexto[];
}

export interface IEstadisticaFilter {
    establecimiento?: number | string;
    periodo?: string | number;
    fechaInicio?: DateTime;
    fechaFin?: DateTime;
}
