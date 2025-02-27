import { DateTime } from 'luxon';

export interface ICiudad {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}