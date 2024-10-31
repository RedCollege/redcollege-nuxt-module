import { DateTime } from "luxon";
import { IItemEntradaCurricular } from "./itemEntradaCurricular";

export interface IEntradaCurricular {
    id: number;
    descripcion: string;
    digitoCurricular: number | null;
    asignatura_id: number;
    grado: number;
    slug: number | null;
    establecimiento_id: number;
    item_entrada_curricular_id: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    itemsEntradaCurricular: Array<IItemEntradaCurricular>;
}