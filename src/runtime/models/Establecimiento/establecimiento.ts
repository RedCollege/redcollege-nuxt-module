import type { DateTime } from 'luxon';
import type { IUsuario } from '../Auth';

interface Meta {
    total: number | null;
    perPage: number | null;
    currentPage: number | null;
    lastPage: number | null;
    firstPage: number | null;
    firstPageUrl: string | null;
    lastPageUrl: string | null;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
}

export interface IEstablecimiento {
    id: number;
    nombre: string;
    logo: string;
    rbd: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IEstablecimientoResponse {
    meta: Meta;
    data: IEstablecimiento[];
}

export interface IUsuarioEstablecimientoResponse {
    meta: Meta;
    data: IUsuario[];
}
