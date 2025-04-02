import { DateTime } from 'luxon';

export interface IParentesco {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}