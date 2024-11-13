import { DateTime } from 'luxon';

export interface IEstadoMatricula {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}