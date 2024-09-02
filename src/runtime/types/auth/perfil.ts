import { DateTime } from 'luxon';

export type TPerfil = {
    id: number;
    usuario_id: number;
    created_at: DateTime;
    updated_at: DateTime;
}