import { DateTime } from 'luxon';

export interface IRegion {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}