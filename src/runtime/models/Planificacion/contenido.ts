import type { IArchivo } from '../General/archivo';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';

export interface IContenido {
    id: number;
    unidadId: number;
    titulo: string;
    fechaInicio: Date | null;     // Cambiado de fechaPlanificada
    fechaFin: Date | null;        // Nuevo campo
    contenidoPlanificado: string | null;  // Nuevo campo (reemplaza descripcion)
    evaluacion: string | null;     // Nuevo campo
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
    unidadId: number | null;
    titulo: string | null;
    fechaInicio: Date | null;    
    fechaFin: Date | null;        
    contenidoPlanificado: string | null; 
    evaluacion: string | null;     
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