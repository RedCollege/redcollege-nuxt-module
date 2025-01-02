import { DateTime } from 'luxon';

export interface IAdjunto {
    id: number;
    mensajeId: number;
    url: string;
    plantillaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}