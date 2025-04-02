import { DateTime } from 'luxon';

export interface IPais {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}