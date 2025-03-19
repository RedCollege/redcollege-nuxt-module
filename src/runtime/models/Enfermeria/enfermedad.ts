import { DateTime } from "luxon";

export interface IEnfermedad {
    id: number;
    nombre: string;
    alias: string;
    establecimientoId: number;
    tipo: number | string;
    createdAt: DateTime;
    updatedAt: DateTime;
}
