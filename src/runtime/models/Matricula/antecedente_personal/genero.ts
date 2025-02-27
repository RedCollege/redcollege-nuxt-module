import { DateTime } from 'luxon';

export interface IGenero {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}