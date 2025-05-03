import type { IHorarioDiaAsignatura } from "./horario_dia_asignatura";

export interface IDia {
    id: number;
    nombre: string;
    bloquesAsignatura: Array<IHorarioDiaAsignatura>;
}
