import { DateTime } from "luxon";
import type { IConfiguracionItem, IUsuario } from "..";

export interface IActividad {
    id: number;
    nombre: string;
    fechaActividad: DateTime;
    lugarActividadId: number;
    establecimientoId: number;
    periodo: number;
    tipoActividadId: number;
    observaciones: string;
    isFinalizada: boolean;
    isSuspendida: boolean;
    deletedBy: number | null;
    deletedAt: DateTime | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    tipoActividad?: IConfiguracionItem;
    lugarActividad?: IConfiguracionItem;
    responsables?: IUsuario[];
    participantes?: IUsuario[];
}

export interface IActividadForm {
    nombre: string;
    fechaActividad: string;
    lugarActividadId: number;
    establecimientoId: number;
    periodo: number;
    tipoActividadId: number;
    descripcion?: string;
    isFinalizada?: boolean;
    isSuspendida?: boolean;
    responsablesIds: number[];
    participantesIds?: number[];
}

export interface IActividadFilter {
    establecimiento?: number;
    periodo?: number;
}

export interface IActividadResponse {
    meta: {
        total: number;
        finalizadas: number;
        suspendidas: number;
        per_page: number;
        current_page: number;
        last_page: number;
        first_page: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string | null;
        previous_page_url: string | null;
    };
    data: IActividad[];
}
