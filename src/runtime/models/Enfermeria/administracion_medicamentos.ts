import type { IArchivo, IEstablecimiento, IUsuario } from "..";

export interface IAdministracionMedicamento {
    id: number;
    periodo: number;
    indicacionTratamiento: string;
    estado: 'en_curso' | 'finalizado' | 'suspendido';
    establecimientoId: number;
    establecimiento: IEstablecimiento;
    pacienteId: number;
    paciente: IUsuario;
    medicamentos: string;
    responsables: IUsuario[];
    adjuntos: IAdministracionMedicamentoAdjunto[];
    recordatorios: IRecordatorio[];
    frecuencia: 'diaria' | 'manual' | null;
    fechaInicio: string | Date;
    fechaFin: string | Date;
    horaFrecuencia: string | Date | null;
}

export interface IAdministracionMedicamentoForm {
    pacienteId: number;
    periodo: number;
    estado: 'en_curso' | 'finalizado' | 'suspendido';
    establecimientoId: number;
    medicamentos: string;
    responsables: number[];
    indicacionTratamiento: string;
    adjuntosIds: number[];
    frecuencia: 'diaria' | 'manual';
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
    estado?: 'en_curso' | 'finalizado' | 'suspendido';
    trashed?: boolean;
    periodo?: number;
    establecimiento?: number;
    paciente?: number;
    responsable?: number;
}

export interface IAdministracionMedicamentoAdjunto {
    id: number;
    administracionMedicamentoId: number;
    archivoId: number;
    archivo: IArchivo;
    createdAt: string;
    updatedAt: string;
}

export interface IAdministracionMedicamentoAdjuntoForm {
    administracionMedicamentoId: number;
    archivoId: number;
}
