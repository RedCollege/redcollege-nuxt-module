import { DateTime } from 'luxon';

export interface IPeriodoEscolar {
    id: number;
    establecimientoId: number;
    periodo: number;
    notaMinima: number;
    porcentajeExigencia: number;
    totalCursos: number;
    totalMatriculas: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}
