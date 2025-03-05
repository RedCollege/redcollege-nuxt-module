import type { IUsuario } from "../Auth/usuario";
import type { IEstadoMatricula } from "./estado_matricula";
import type { ICondicionMatricula } from "./condicion_matricula";
import { DateTime } from "luxon";
import type { IAntecedentePersonal } from "./antecedente_personal";
import type { ITipoMatricula } from "./tipo_matricula";
import type { IEstablecimiento } from "../Establecimiento";
import type { IProcedencia } from "../Establecimiento/procedencia";
import type { IAntecedenteEscolarSocial } from "../Establecimiento/antecedente_escolar_social";
import type { IAntecedenteFamiliar } from "./antecedente_familiar";
import type { IAutorizadoRetiro } from "./autorizado_retiro";
import type { ITutorEconomico } from "./tutor_economico";
import type { IAntecedenteSalud } from "./antecedente_salud";

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
    createdAt: DateTime;
    updatedAt: DateTime;
    usuario: IUsuario;
    antecedentePersonal: IAntecedentePersonal;
    estadoMatricula: IEstadoMatricula;
    condicionMatricula: ICondicionMatricula;
    establecimiento: IEstablecimiento;
    tipoMatricula: ITipoMatricula;
    procedencia: IProcedencia;
    antecedenteEscolarSocial: IAntecedenteEscolarSocial;
    antecedenteFamiliar: Array<IAntecedenteFamiliar>;
    antecedenteSalud: Array<IAntecedenteSalud>;
    tutorEconomico: Array<ITutorEconomico>;
    autorizadoRetiro: Array<IAutorizadoRetiro>;
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
