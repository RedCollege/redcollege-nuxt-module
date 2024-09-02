import { DateTime } from 'luxon';

export type TEstablecimiento = {
    id: number;
    nombre: string;
    logo: string;
    rbd: string;
    created_at: DateTime;
    updated_at: DateTime;
}