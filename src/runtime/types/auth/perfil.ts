import { DateTime } from 'luxon';

export interface IPerfil {
    id: number;
    usuario_id: number;
    created_at: DateTime;
    updated_at: DateTime;
}