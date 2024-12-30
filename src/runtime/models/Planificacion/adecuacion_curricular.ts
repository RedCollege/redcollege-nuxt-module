import type { DateTime } from "luxon";
import type { ICursoAsignatura } from "../Establecimiento/curso_asignatura";
import type { IUsuario } from "../Auth/usuario";
import type { IItemEntradaCurricular } from "../Curriculum/item_entrada_curricular";
export interface IAdecuacionCurricular {
    id: number;
    contenidoId: number;
    actividad: string | null;
    fechaInicio: DateTime | null;
    fechaFin: DateTime | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: DateTime;
    deletedBy?: number;
    asignaturas: Array<ICursoAsignatura>;
    estudiantes: Array<IUsuario>;
    itemsCurriculares: Array<IItemEntradaCurricular>;
}

interface IItemCurricular {
    id: number;
    adecuacionCurricular: string;
}

export interface IAdecuacionCurricularForm {
    contenidoId: number;
    actividad: string;
    fechaInicio: string | Date;
    fechaFin: string | Date;
    estudiantes: number[];
    asignaturas: number[];
    itemsCurriculares: IItemCurricular[];
}

interface Meta {
    total: number | null;
    perPage: number | null;
    currentPage: number | null;
    lastPage: number | null;
    firstPage: number | null;
    firstPageUrl: string | null;
    lastPageUrl: string | null;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
}

export interface IAdecuacionCurricularPaginated {
    meta: Meta;
    data: IAdecuacionCurricular[];
}
