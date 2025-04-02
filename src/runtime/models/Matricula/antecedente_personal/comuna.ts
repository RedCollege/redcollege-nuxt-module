import { DateTime } from 'luxon';

export interface IComuna {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}