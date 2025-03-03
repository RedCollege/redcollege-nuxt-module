import { DateTime } from "luxon";
import type { IMatricula } from "./matricula";

export interface ITutorEconomico {
    id: number;
    Rut: string;
    nombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    lugarTrabajo: string;
    correo: string;
    nivelEstudios: number;
    profesion: string;
    telefono: string;
    direccion: string;
    matriculaId: number;
    parentescoId: number;
    generoId: number;
    tipoDocumentoId: number;
    nacionalidadId: number;
    paisId: number;
    ciudadId: number;
    regionId: number;
    comunaId: number;
    codigoPostal: string;
    nDepartamento: string;
    religionId: number;
    etniaId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    matricula: IMatricula;
}
