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
    deletedAt?: DateTime;
    deletedBy?: number;
    archivos?: IArchivo[];
    itemsEntrada?: IItemEntradaCurricular[];
    actividades?: IContenidoActividad[];
    recursos?: IContenidoRecurso[];
    registrosDua: Array<IRegistroDua>;
    adecuacionesCurriculares: Array<IAdecuacionCurricular>;
}

export interface IContenidoForm {
    unidadId: number | null;
    titulo: string | null;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    contenidoPlanificado: string | null;
    evaluacion: string | null;
    isCumplido: boolean;
    isVisible: boolean;
    haveAdecuaciones?: boolean
    itemsEntrada?: IItemEntradaCurricular[]
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