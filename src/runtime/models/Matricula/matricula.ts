import type { IUsuario } from "../Auth/usuario";
import type { IEstadoMatricula } from "./estado_matricula";
import type { ICondicionMatricula } from "./condicion_matricula";
import { DateTime } from "luxon";
import type { IAntecedentePersonal } from "./antecedente_personal";
import type { ITipoMatricula } from "./tipo_matricula";
import type { IEstablecimiento } from "../Establecimiento";
import type { IProcedencia } from "../Establecimiento/procedencia";
import type { IAntecedenteEscolarSocial } from "../Establecimiento/antecedente_escolar_social";

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

export interface IMatricula {
    id: number;
    nMatricula: number;
    fechaMatricula: DateTime;
    usuarioId: number;
    establecimientoId: number;
    condicionMatricula_Id: number;
    estadoMatriculaId: number;
    tipoMatriculaId: number;
    procedenciaId: number;
    periodo: number;
    fechaRetiro: DateTime;
    colegioProcedencia: string;
    anioIngreso: string;
    harepetidoCurso: boolean;
    observaciones: string;
    usuario: IUsuario;
    antecedentePersonal: IAntecedentePersonal;
    estadoMatricula: IEstadoMatricula;
    condicionMatricula: ICondicionMatricula;
    establecimiento: IEstablecimiento;
    tipoMatricula: ITipoMatricula;
    procedencia: IProcedencia;
    antecedenteEscolarSocial: IAntecedenteEscolarSocial;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IMatriculaUpdate {
    matriculaId: number;
    rut: string;
    estadoMatriculaId: number;
}

export interface IMatriculaResponse {
    meta: Meta;
    data: IMatricula[];
}
