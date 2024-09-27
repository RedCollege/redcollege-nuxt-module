import type { DateTime } from 'luxon';
import type { IPlanificacion } from './planificacion';

export interface IUnidad {
    id: number;
    planificacionId: number;
    titulo: string;
    numero: number;
    descripcion: string | null;
    fechaInicio: DateTime | null | string;
    fechaFin: DateTime | null | string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
    planificacion: IPlanificacion;
}

export interface IUnidadForm {
    planificacionId: number,
    titulo: string,
    numero: number,
    descripcion: string,
    fechaInicio: DateTime | null,
    fechaFin: DateTime | null
}