import { DateTime } from "luxon";
import type { IGrupoSanguineo } from "./antecedente_salud/grupo_sanguineo";
import type { IMatricula } from "./matricula";

export interface IAntecedenteSalud {
    id: number;
    enfermedades: string;
    alergias: string;
    tipoVision: string;
    tipoAudicion: string;
    grupoSangreId: number;
    emergLlamar: string;
    usalentesOpticos: string;
    usaAudifonos: string;
    sistemaSalud: string;
    telefonoEmergencia: string;
    matricula_i?: number;
    peso: number;
    talla: string;
    problemasCardiacos: boolean;
    problemasColumna: boolean;
    observacionesSalud: string;
    seguro: string;
    trasladar: string;
    observaciones: string;
    contactosEmergencia: object;
    createdAt: DateTime;
    updatedAt: DateTime;
    matricula: IMatricula;
    grupoSanguineo: IGrupoSanguineo;
}

export interface IAntecedenteSaludForm {
    id: number;
    enfermedades: string;
    alergias: string;
    tipoVision: string;
    tipoAudicion: string;
    grupoSangreId: number;
    usalentesOpticos: string;
    usaAudifonos: string;
    sistemaSalud: string;
    peso: number;
    talla: string;
    problemasCardiacos: boolean;
    problemasColumna: boolean;
    observaciones: string;
}
