import { DateTime } from 'luxon';

export interface ITipoEnfermedad {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}