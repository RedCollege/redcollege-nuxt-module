import { DateTime } from "luxon";
import { IUnidad } from "./unidad";
import { IEntradaCurricular } from "./entradaCurricular";
import { IPlanificacion } from "..";

export interface IItemEntradaCurricular {
    id: number;
    descripcion: string | null;
    entradaCurricularId: number | null;
    establecimientoId: number;
    nivelPriorizacionId: number | null;
    slug: string | null;
    alias: string | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    unidadesRelacionadas: Array<IUnidad>;
    planificaciones: Array<IPlanificacion>;
    entradaCurricular: IEntradaCurricular;
}