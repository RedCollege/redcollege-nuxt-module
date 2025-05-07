import { DateTime } from 'luxon';
import type { ICursoAsignatura } from "../../Establecimiento/curso_asignatura";

export interface IHorarioDiaAsignatura {
    id: number;
    tipoBloqueDiaId: number;
    horaInicio: string & { __timeOnly: true };
    horaFin: string & { __timeOnly: true };
    cursoAsignaturaId: number;
    horarioDiaId: number;
    isAsistencia: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
    cursoAsignatura: ICursoAsignatura;
    totalAsistenciaBloques: number;
}
