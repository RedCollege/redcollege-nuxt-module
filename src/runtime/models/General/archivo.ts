import type { DateTime } from 'luxon';

export interface IArchivo {
    id: number;
    nombre: string;
    url: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    peso: number;
} 