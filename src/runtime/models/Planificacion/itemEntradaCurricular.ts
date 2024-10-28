import { DateTime } from "luxon";
import { IUnidad } from "./unidad";

export interface IItemEntradaCurricular {
    id: number;
    descripcion: string;
    entradaCurricularId: number | null;
    grado: number | null;
    isEje: boolean | null;
    isHabilidad: boolean | null;
    isIndicador: boolean | null;
    isObjetivo: boolean | null;
    oldId: number | null;
    unidades: JSON | null;
    establecimientoId: number;
    nivelPriorizacionId: number | null;
    slug: number | null;
    alias: string | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    unidadesRelacionadas: Array<IUnidad>;
}