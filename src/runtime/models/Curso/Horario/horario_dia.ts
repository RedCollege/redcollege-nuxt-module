import { DateTime } from 'luxon';
import type { IDia } from "./dia.ts";
import type { IHorarioDiaAsignatura } from "./horario_dia_asignatura";

export interface IHorarioDia {
    id: number;
    horarioId: number;
    diaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    dia: IDia;
    bloquesAsignatura: Array<IHorarioDiaAsignatura>;
}
