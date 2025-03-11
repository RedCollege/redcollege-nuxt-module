import type { IArchivo } from '../General/archivo';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';
import type { DateTime } from 'luxon';
import type { IRegistroDua } from './dua';

export interface IContenido {
    id: number;
    unidadId: number;
    titulo: string;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    contenidoPlanificado: string | null;
    evaluacion: string | null;
    isCumplido: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: DateTime;
    deletedBy?: number;
    archivos?: IArchivo[];
    itemsEntrada?: IItemEntradaCurricular[];
    actividades?: IContenidoActividad[];
    recursos?: IContenidoRecurso[];
    registrosDua: Array<IRegistroDua>;
}

export interface IContenidoForm {
    unidadId: number | null;
    titulo: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    contenidoPlanificado: string | null;
    evaluacion: string | null;
    isCumplido: boolean;
}


export interface IContenidoActividad {
    id: number;
    contenidoId: number;
    descripcion: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: DateTime;
    deletedBy?: number;
}

export interface IContenidoRecurso {
    id: number;
    contenidoId: number;
    descripcion: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: DateTime;
    deletedBy?: number;
}