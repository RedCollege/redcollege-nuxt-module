import type { DateTime } from 'luxon';
import type { IAsignaturaCurricular } from "./asignatura_curricular.ts";
import type { IAsignaturaSige } from "./asignatura_sige.ts";

export interface ICursoAsignaturaCurricular {
    id: number;
    cursoId: number;
    asignaturaId: number;
    notaAPromedio: boolean;
    notaConEscala: boolean;
    notaAllInforme: boolean;
    parentAsignaturaId: number | null;
    isPonderacionSimple: boolean;
    posicion: number | null;
    notaCalculable: boolean;
    tipoEvaluacionId: number | null;
    asignaturaSigeId: number | null;
    alias: string | null;
    color: string | null;
    reglaPromocion: string | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    asignaturas: Array<ICursoAsignaturaCurricular>;
    asignaturaCurricular: IAsignaturaCurricular;
    asignaturaSige: IAsignaturaSige;
}
