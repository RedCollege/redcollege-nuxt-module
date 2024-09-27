import type { DateTime } from 'luxon';

export interface IEstado {
    id: number;
    nombre: string;
    deleted_at: DateTime;
}