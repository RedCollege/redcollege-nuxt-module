import { DateTime } from 'luxon';

export interface IPerfil {
    id: number;
    usuarioId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}