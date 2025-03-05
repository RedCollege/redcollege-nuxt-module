import { DateTime } from 'luxon';

export interface IGrupoSanguineo {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}