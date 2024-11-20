import { DateTime } from "luxon";
import type { IItemEntradaCurricular } from "./item_entrada_curricular";
import type { IAsignaturaCurricular } from "../Establecimiento/asignatura_curricular";

export interface IEntradaCurricular {
    id: number;
    descripcion: string;
    digitoCurricular: number | null;
    asignaturaId: number;
    grado: number;
    slug: number | null;
    establecimientoId: number;
    itemEntradaCurricularId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    itemsEntradaCurricular: Array<IItemEntradaCurricular>;
    asignaturaCurricular: IAsignaturaCurricular;
}