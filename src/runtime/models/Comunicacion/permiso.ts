import { DateTime } from 'luxon';

export interface IPermiso {
    id?: number;
    establecimientoId: number;
    isProfAllowedInternal: boolean;
    isProfAllowedApod: boolean;
    createdAt?: DateTime;
    updatedAt?: DateTime;
}
