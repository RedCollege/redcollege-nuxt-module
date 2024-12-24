import { DateTime } from "luxon";
import type { IEstrategia } from "./estrategia";

export interface ISugerencia {
    id: number;
    nombre: string;
    estrategiaDuaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    estrategia: IEstrategia;
}