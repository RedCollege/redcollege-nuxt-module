import { DateTime } from 'luxon';
import type { ICurso } from './curso';
import type { IAsignaturaCurricular } from './asignatura_curricular';
import type { IAsignaturaSige } from './asignatura_sige';
import type { IUsuario } from '../Auth';

export interface ICursoAsignatura {
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
    asignaturas: Array<ICursoAsignatura>;
    asignaturaCurricular: IAsignaturaCurricular;
    asignaturaSige: IAsignaturaSige;
    /**
     * Retorna el nombre final de la asignatura ya sea que sea sige, alias o normal
     */
    nombreCompleto: string;
    usuarios: IUsuario[]
}
