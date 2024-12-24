import { DateTime } from "luxon";
import type { IPrincipio } from "./principio";
import type { IEstrategia } from "./estrategia";

export interface IPauta {
    id: number;
    digito: number;
    nombre: string;
    principioDuaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    estrategias: Array<IEstrategia>;
    principio: IPrincipio;
}