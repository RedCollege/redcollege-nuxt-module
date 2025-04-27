import { DateTime } from "luxon";
import type { IMatricula } from "../Matricula";

export interface IAntecedenteEscolarSocial {
    id: number;
    integracionEscolarpie: boolean;
    clasificacionEconomica: number;
    origenIndigena: number;
    matricula_id: number;
    becaId: number | null;
    otraBeca: string | null;
    diagnosticoPie: number | null;
    poseeBeca_Id: number | null;
    tipoApoyo_id: number | null;
    createdAt: DateTime;
    updatedAt: DateTime;
    matricula: IMatricula;
}
