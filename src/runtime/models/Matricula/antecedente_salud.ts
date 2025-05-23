import { DateTime } from "luxon";
import type { IGrupoSanguineo } from "./antecedente_salud/grupo_sanguineo";
import type { IMatricula } from "./matricula";
import type { IEnfermedad } from "../Enfermeria/enfermedad";

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
    imc: string | number;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    matricula: IMatricula;
    grupoSanguineo: IGrupoSanguineo;
    enfermedadesDiagnostico: Array<IEnfermedad>;
}

export interface IAntecedenteSaludForm {
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
    enfermedadesDiagnosticoIds: number[];
}
