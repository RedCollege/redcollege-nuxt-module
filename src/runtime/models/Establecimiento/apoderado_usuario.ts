import { DateTime } from "luxon";
import type { IUsuario } from "..";
import type { IParentesco } from "../Matricula/antecedente_familiar/parentesco";

export interface IApoderadoUsuario {
    id: number;
    parentescoId: number;
    apoderadoId: number;
    estudianteId: number;
    participaCrianza: boolean;
    contactarEmergencia: boolean;
    viveConEstudiante: boolean;
    isContactoPrimario: boolean;
    createdAt: DateTime;
    updatedAt: DateTime;
    apoderado: IUsuario;
    estudiante: IUsuario;
    parentesco: IParentesco;
}
