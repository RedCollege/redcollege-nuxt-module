import { DateTime } from 'luxon';
import type { ISistemaPlantilla } from "./sistema_plantilla.ts";

export interface ITipoPlantilla {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    plantillas: Array<ISistemaPlantilla>;
}
