import type { DateTime } from 'luxon';
import type { IPlanificacion } from './planificacion';
import type { IItemEntradaCurricular } from '../Curriculum/itemEntradaCurricular';

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
    itemsEntradasCurriculares: Array<IItemEntradaCurricular>
}

export interface IUnidadForm {
    planificacionId: number,
    titulo: string,
    numero: number,
    descripcion: string,
    fechaInicio: DateTime | null,
    fechaFin: DateTime | null
}