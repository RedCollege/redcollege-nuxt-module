import { DateTime } from 'luxon';

export interface IReligion {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}