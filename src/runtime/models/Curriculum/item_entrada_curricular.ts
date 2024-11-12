import type { DateTime } from "luxon";
import type { IUnidad } from "../Planificacion/unidad";
import type { IEntradaCurricular } from "./entrada_curricular";
import type { IPlanificacion } from "..";

export interface IItemEntradaCurricular {
    id: number;
    entradaCurricularId: number | null;
    establecimientoId: number;
    descripcion: string;
    nivelPriorizacionId: number | null;
    slug: string | null;
    itemEntradaCurricularId: number;
    alias: string | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    entradasCurriculares: Array<IEntradaCurricular>;
    unidadesRelacionadas: Array<IUnidad>;
    planificaciones: Array<IPlanificacion>;
    entradaCurricular: IEntradaCurricular;
}