import type { DateTime } from 'luxon';
import type { ICursoAsignatura, ICurso } from '../Establecimiento';
import type { IEstablecimiento } from "../Establecimiento/establecimiento";
import type { IUsuario } from "../Auth/usuario";
import type { IUnidad } from './unidad';
import type { IItemEntradaCurricular } from '../Curriculum/item_entrada_curricular';

export interface IPlanificacion {
    id: number;
    titulo: string;
    periodo: string;
    isColaborativa: boolean;
    cobertura: number;
    estadoId: number;
    cursoId: number;
    establecimientoId: number;
    usuarioId: number;
    unidadId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
    deletedBy: number | null;
    curso: ICurso;
    establecimiento: IEstablecimiento;
    usuario: IUsuario;
    colaboradores: Array<IUsuario>;
    asignaturas: Array<ICursoAsignatura>;
    unidades: Array<IUnidad>;
    itemsEntradasCurriculares: Array<IItemEntradaCurricular>;
}

export interface IPlanificacionResponse {
    meta: Meta,
    data: IPlanificacion[]
}

export interface IPlanificacionForm {
    titulo: string,
    periodo: string,
    cobertura: number,
    isColaborativa: boolean,
    estadoId: number,
    cursoId: number,
    establecimientoId: number,
    colaboradores: number[],
    asignaturas: number[]
}

interface Meta {
    total: number | null,
    perPage: number | null,
    currentPage: number | null,
    lastPage: number | null,
    firstPage: number | null,
    firstPageUrl: string | null,
    lastPageUrl: string | null,
    nextPageUrl: string | null,
    previousPageUrl: string | null
}

export interface ICantidadComponentes {
    cantidadComponentes: number
}