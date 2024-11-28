import type { IArchivo } from '../General/archivo';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';

export interface IContenido {
    id: number;
    unidadId: number;
    titulo: string;
    descripcion: string;
    fechaPlanificada: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: number;
    archivos?: IArchivo[];
    itemsEntrada?: IItemEntradaCurricular[];
    actividades?: IContenidoActividad[];
    recursos?: IContenidoRecurso[];
}

export interface IContenidoForm {
    unidadId: number;
    titulo: string;
    descripcion: string;
    fechaPlanificada: Date;
}

export interface IContenidoActividad {
    id: number;
    contenidoId: number;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: number;
}

export interface IContenidoRecurso {
    id: number;
    contenidoId: number;
    descripcion: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: number;
} 