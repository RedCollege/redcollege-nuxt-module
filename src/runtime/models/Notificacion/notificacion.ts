import type { DateTime } from "luxon";
import type { IUsuario } from "../../types";

export interface INotificacionesResponse {
    meta: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
        firstPage: number;
        firstPageUrl: string | null;
        lastPageUrl: string | null;
        nextPageUrl: string | null;
        previousPageUrl: string | null;
    };
    data: INotificacion[];
}

export interface INotificacion {
    id: number;
    tipoId: number;
    plantillaId: number;
    destinatarioId: number;
    emisorId: number;
    entidadTipo: string;
    entidadId: number;
    asunto: string;
    finalUrl: string;
    mensaje: string;
    isLeido: boolean;
    deletedAt: DateTime | null;
    fechaLectura: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
    emisor: IUsuario;
    tipo: ITipo;
}

interface ITipo {
    id: number;
    codigo: string;
    nombre: string;
    icono: string;
    baseUrl: string;
    color: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface INotificacionesQueryParams {
    isLeido?: boolean;
    tipoId?: number;
    page?: number;
    limit?: number;
    search?: string;
}

export interface INotificacionContadores {
    noLeidas: number;
    total: number;
}
