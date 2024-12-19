import type { IUsuario } from "../Auth/usuario";
import type { IEstadoMatricula } from "./estado_matricula";
import type { ICondicionMatricula } from "./condicion_matricula";
import { DateTime } from 'luxon';

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


export interface IMatricula {
    id: number;
    nMatricula: number;
    fechaMatricula: DateTime;
    usuarioId: number;
    condicionMatriculaId: number;
    estadoMatriculaId: number;
    periodo: number;
    fechaRetiro: DateTime;
    usuario: IUsuario;
    estadoMatricula: IEstadoMatricula;
    condicionMatricula: ICondicionMatricula;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IMatriculaUpdate {
    matriculaId: number;
    rut: string;
    estadoMatriculaId: number;
}

export interface IMatriculaResponse {
    meta: Meta,
    data: IMatricula[]
}
