import { DateTime } from 'luxon';

export interface IEstadoCivil {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}