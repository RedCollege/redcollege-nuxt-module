import type { DateTime } from 'luxon';
import type { IPlanificacion } from './planificacion';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';
import type { IArchivo } from '../General/archivo';

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
    itemsEntradaCurricular: Array<IItemEntradaCurricular>;
    planificacion: IPlanificacion;
    archivos: Array<IArchivo>;
}

export interface IUnidadForm {
    planificacionId: number,
    titulo: string,
    numero: number,
    descripcion: string,
    fechaInicio: DateTime | null,
    fechaFin: DateTime | null
}