import { DateTime } from "luxon";
import type { IPauta } from "./pauta";
import type { ISugerencia } from "./sugerencia";

export interface IEstrategia {
    id: number;
    descripcion: string;
    pautaDuaId: number;
    nombre: string;
    digito: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    sugerencias: Array<ISugerencia>;
    pauta: IPauta;
}