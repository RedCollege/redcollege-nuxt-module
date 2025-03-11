import { DateTime } from "luxon";
import type { ITipoEnfermedad } from "./tipo_enfermedad";

export interface IEnfermedad {
    id: number;
    nombre: string;
    alias: string;
    establecimientoId: number;
    tipoId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    tipoEnfermedad: ITipoEnfermedad;
}
