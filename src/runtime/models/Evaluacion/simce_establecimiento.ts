export type TipoEvaluacion = "SIMCE" | "PAES";

export type EstadoVersion = "activa" | "comprometida" | "deprecada" | "beta";

export interface IVersionDisponible {
    version: string;
    estado: EstadoVersion;
    descripcion: string;
    id: number;
}

export interface IEnsayoConfig {
    numeroEnsayo: number;
    habilitado: boolean;
    versionSeleccionada: string;
    versionesDisponibles: IVersionDisponible[];
    tieneMultiplesVersiones: boolean;
}

export interface IEvaluacionConfig {
    id: number;
    gradoEducacionalId: number;
    grupoAsignaturaId: number;
    nombre: string;
    tipoEvaluacion: TipoEvaluacion;
    ensayos: IEnsayoConfig[];
}

export interface IEvaluacionComprometida {
    nombre: string;
    ensayo: number;
    version: string;
}

export interface IResumenConfiguracion {
    totalHabilitadas: number;
    totalComprometidas: number;
    evaluacionesComprometidas: IEvaluacionComprometida[];
}

export interface IConfiguracionEvaluacionesResponse {
    establecimientoId: number;
    periodo: number;
    evaluaciones: IEvaluacionConfig[];
    resumen: IResumenConfiguracion;
}

// Para el request de actualización
export interface IConfiguracionCambio {
    enabled: boolean;
    version: string;
}

export interface IActualizarConfiguracionRequest {
    configuraciones: Record<string, IConfiguracionCambio>;
}

// Para las alertas de seguridad
export interface IAlertaEvaluacion {
    evaluacion: string;
    ensayo: number;
    version: string;
    descripcion: string | null;
    establecimientosAfectados: number;
}

export interface IAlertasResponse {
    periodo: number;
    totalAlertas: number;
    alertas: IAlertaEvaluacion[];
}

