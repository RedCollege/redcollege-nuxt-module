import { DateTime } from 'luxon';
import type { IHorarioDia } from "./horario_dia";

export interface IHorario {
    id: number;
    cursoId: number;
    fechaActivacion: DateTime;
    isConfirmed: boolean;
    createdAt: DateTime;
    diasHorario: Array<IHorarioDia>;
}
