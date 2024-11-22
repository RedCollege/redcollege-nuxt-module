import type { DateTime } from 'luxon';
import type { IUnidad } from '../Planificacion/unidad';

export interface IArchivo {
    id: number;
    nombre: string;
    url: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    peso: number;
    unidades: Array<IUnidad>;
} 