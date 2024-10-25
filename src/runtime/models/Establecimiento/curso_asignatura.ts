import { DateTime } from 'luxon';
import type { ICurso } from './curso';
import type { IAsignaturaCurricular } from './asignatura_curricular';
import type { IAsignaturaSige } from './asignatura_sige';

export interface ICursoAsignatura {
    id: number;
    cursoId: number;
    asignaturaId: number;
    asignaturaSigeId: number;
    alias: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    curso: ICurso;
    asignaturaCurricular: IAsignaturaCurricular;
    asignaturaSige: IAsignaturaSige;
}