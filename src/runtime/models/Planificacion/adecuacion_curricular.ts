import type { DateTime } from "luxon";
import type { ICursoAsignatura } from "../Establecimiento/curso_asignatura";
import type { IUsuario } from "../Auth/usuario";
import type { IItemEntradaCurricular } from "../Curriculum/item_entrada_curricular";
export interface IAdecuacionCurricular {
    id: number;
    contenidoId: number;
    actividad: string | null;
    fechaInicio: DateTime | null;
    fechaFin: DateTime | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt?: DateTime;
    deletedBy?: number;
    cursoAsignaturasIds: Array<ICursoAsignatura>;
    estudiantesIds: Array<IUsuario>;
    itemsIds: Array<IItemEntradaCurricular>;
}
