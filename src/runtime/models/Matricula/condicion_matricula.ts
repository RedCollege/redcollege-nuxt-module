import { DateTime } from 'luxon';

export interface ICondicionMatricula {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}