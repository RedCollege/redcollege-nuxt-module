import { DateTime } from "luxon";

export interface ITipoMatricula {
    id: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}
