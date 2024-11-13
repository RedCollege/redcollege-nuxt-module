import { DateTime } from 'luxon';

export interface IPeriodoEscolar {
    id: number;
    establecimientoId: number;
    periodo: number;
    notaMinima: number;
    porcentajeExigencia: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}
