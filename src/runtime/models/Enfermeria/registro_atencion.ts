import type { DateTime } from "luxon";
import type {
    ICurso,
    IConfiguracionItem,
    IUsuario,
    IRegistroAtencionAdjunto,
    IEstablecimiento,
} from "..";

export interface IRegistroAtencion {
    id: number;
    establecimientoId: number;
    usuarioId: number;
    cursoId: number;
    periodo: number;
    pacienteId: number;
    fechaIngreso: DateTime;
    origenId: number;
    origen: IConfiguracionItem;
    motivo: IConfiguracionItem[];
    diagnostico: string;
    isFinalizada?: boolean;
    fechaSalida?: DateTime;
    destinoId?: number;
    destino?: IConfiguracionItem;
    tratamientoId?: number;
    tratamiento?: IConfiguracionItem;
    indicaciones?: string;
    paciente: IUsuario;
    usuario: IUsuario;
    curso: ICurso;
    deletedBy?: number;
    deletedAt?: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
    adjuntos: IRegistroAtencionAdjunto[];
}

export interface IRegistroAtencionResponse {
    meta: {
        total: number;
        perPage: number;
        currentPage: number;
        finalizadas: number;
        abiertas: number;
    };
    data: IRegistroAtencion[];
}

export interface IRegistroAtencionDescargable {
    meta: {
        total: number;
        finalizadas: number;
        abiertas: number;
        establecimiento: IEstablecimiento
    };
    data: IRegistroAtencion[];
}

export interface IRegistroAtencionForm {
    establecimientoId: number;
    usuarioId: number;
    cursoId: number;
    periodo: number;
    pacienteId: number;
    fechaIngreso: DateTime;
    origenId: number;
    motivoId: number[];
    diagnostico: string;
    isFinalizada?: boolean;
    fechaSalida?: DateTime;
    destinoId?: number;
    tratamientoId?: number;
    indicaciones?: number;
    adjuntosIds?: number[];
}

interface IRangoFecha {
    start: Date | string;
    end: Date | string;
}
export interface IRegistroAtencionFilters {
    trashed?: boolean;
    searchTerm?: string;
    page?: number;
    periodo?: string | number;
    establecimiento?: number | string;
    rangoFecha?: IRangoFecha;
    paciente?: number | string;
    curso?: string | number;
    motivo?: string;
    origen?: string;
    destino?: string;
    estado?: boolean;
}
