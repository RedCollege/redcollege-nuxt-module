import type { IArchivo, IEstablecimiento, IUsuario } from "..";
export interface IAdministracionMedicamento {
    id: number;
    periodo: number;
    indicacionTratamiento: string;
    estado: EnumAdministracionMedicamentoEstado;
    establecimientoId: number;
    establecimiento: IEstablecimiento;
    pacienteId: number;
    paciente: IUsuario;
    medicamentos: string;
    responsables: IUsuario[];
    adjuntos: IArchivo[];
    recordatorios: IRecordatorio[];
    frecuencia: FrecuenciaTipo;
    fechaInicio: string | Date;
    fechaFin: string | Date;
    viaTelefonicaCount: number;
    mensajesCount: number;
    horaFrecuencia: string | Date | null;
}

export interface IAdministracionMedicamentoForm {
    pacienteId: number;
    periodo: number;
    estado: EnumAdministracionMedicamentoEstado;
    establecimientoId: number;
    medicamentos: string;
    responsables: number[];
    indicacionTratamiento: string;
    adjuntosIds: number[];
    frecuencia: FrecuenciaTipo;
    fechaInicio: string | Date;
    fechaFin: string | Date;
    horaFrecuencia?: string | Date | null;
    recordatorios?: IRecordatorioForm[];
}

export interface IRecordatorio {
    id?: number;
    fechaHora: string | Date;
    administracionMedicamentoId?: number;
}

export interface IRecordatorioForm {
    fechaHora: string | Date;
}

export interface IAdministracionMedicamentoResponse {
    meta: {
            total: number;
            perPage: number;
            currentPage: number;
        };
    data: IAdministracionMedicamento[];
}

export interface IAdministracionMedicamentoFilter {
    searchTerm?: string;
    page?: number;
    estado?: EnumAdministracionMedicamentoEstado;
    trashed?: boolean;
    periodo?: number;
    establecimiento?: number;
    paciente?: number;
    responsable?: number;
    mes?: string | Date;
}

export interface ISideCalendarEvents {
    fecha: string | Date;
    nombre: string;
    color: string;
    hora: string;
    medicamentos: string;
    estado: EnumAdministracionMedicamentoEstado;
    checked: boolean;
}

export enum EnumAdministracionMedicamentoEstado {
    EN_CURSO = 'en_curso',
    FINALIZADO = 'finalizado',
    SUSPENDIDO = 'suspendido',
}

export enum FrecuenciaTipo {
    Diaria = 'diaria',
    Manual = 'manual'
}