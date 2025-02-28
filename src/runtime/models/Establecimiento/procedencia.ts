import { DateTime } from 'luxon';

export interface IProcedencia {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}