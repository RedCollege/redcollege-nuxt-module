import { DateTime } from "luxon";
import type { IParentesco } from "./antecedente_familiar/parentesco";

export interface IAntecedenteFamiliar {
    id: number;
    nombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    generoId: number;
    tipoDocumentoId: number;
    nDocumento: string;
    ciudadId: number;
    paisId: number;
    regionId: number;
    comunaId: number;
    direccion: string;
    codigoPostal: string;
    nDepartamento: string;
    correo: string;
    telefono: string;
    religionId: number;
    etniaId: number;
    parentescoId: number;
    nacionalidadId: number;
    matricula_id: number;
    participaCrianza: boolean;
    isApoderado: boolean;
    viveConEstudiante: boolean;
    parentesco: IParentesco;
    createdAt: DateTime;
    updatedAt: DateTime;
}
