import type { DateTime } from 'luxon';
import type { IPlanificacion } from './planificacion';

export interface IUnidadResponse {
    id: number;
    planificacion_id: number;
    titulo: string;
    numero: number;
    descripcion: string | null;
    fecha_inicio: DateTime | null | string;
    fecha_fin: DateTime | null | string;
    created_at: DateTime;
    updated_at: DateTime;
    deleted_at: DateTime;
    planificacion: IPlanificacion;
}

export interface IUnidad {
    planificacion_id: number,
    titulo: string,
    numero: number,
    descripcion: string,
    fecha_inicio: DateTime | null,
    fecha_fin: DateTime | null
}