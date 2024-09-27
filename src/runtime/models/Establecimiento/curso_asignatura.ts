import type { DateTime } from 'luxon';

export interface ICursoAsignatura {
    id: number;
    cursoId: number;
    asignaturaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}