import { DateTime } from 'luxon';
import { ICurso } from './curso';
import { IAsignaturaCurricular } from './asignatura_curricular';
import { IAsignaturaSige } from './asignatura_sige';

export interface ICursoAsignatura {
    id: number;
    cursoId: number;
    asignatura_id: number;
    asignatura_sige_id: number;
    alias: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    curso: ICurso;
    asignaturaCurricular: IAsignaturaCurricular;
    asignaturaSige: IAsignaturaSige;
}