import { DateTime } from 'luxon';

export interface ITipoDocumento {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}