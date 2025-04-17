import type { IArchivo } from '../General/archivo';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';
import type { DateTime } from 'luxon';
import type { IRegistroDua } from './dua';
import type { IUnidad } from './unidad';
import type { IAdecuacionCurricular } from './adecuacion_curricular';

export interface IContenido {
    id: number;
    unidadId: number;
    titulo: string;
    fechaInicio: DateTime;
    fechaFin: DateTime;
    contenidoPlanificado: string | null;
    evaluacion: string | null;
    isCumplido: boolean;
    isVisible: boolean;
    deletedBy: number | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
    unidad: IUnidad;
    haveAdecuaciones: boolean
    actividades: Array<IContenidoActividad>;
    recursos: Array<IContenidoRecurso>;
    archivos: Array<IArchivo>;
    itemsEntrada: Array<IItemEntradaCurricular>;
    registrosDua: Array<IRegistroDua>;
    adecuacionesCurriculares: Array<IAdecuacionCurricular>;
}

export interface IContenidoForm {
    unidadId: number | null;
    titulo: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    haveAdecuaciones?: boolean
    contenidoPlanificado: string | null;
    evaluacion: string | null;
    isCumplido: boolean;
    isVisible: boolean;
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