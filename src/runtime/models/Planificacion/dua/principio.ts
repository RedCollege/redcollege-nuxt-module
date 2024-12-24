import { DateTime } from "luxon";
import type { IPauta } from "./pauta";

export interface IPrincipio {
    id: number;
    digito: number;
    nombre: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    pautas: Array<IPauta>;
}