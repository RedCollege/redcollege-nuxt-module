import type { DateTime } from 'luxon';

export interface IEstablecimiento {
    id: number;
    nombre: string;
    logo: string;
    rbd: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}