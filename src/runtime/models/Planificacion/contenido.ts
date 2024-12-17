import type { IArchivo } from '../General/archivo';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';

export interface IContenido {
    id: number;
    unidadId: number;
    titulo: string;
    fechaInicio: Date | null;     
    fechaFin: Date | null;        
    contenidoPlanificado: string | null;  
    evaluacion: string | null;   
    is_cumplido:boolean;  
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
    is_cumplido:boolean;   
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