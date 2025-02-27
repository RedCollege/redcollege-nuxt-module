import { DateTime } from "luxon";

export interface IAntecedentePersonal {
    id: number;
    run: string;
    nombre: string;
    segundoNombre: string;
    matriculaId: number;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: DateTime;
    direccion: string;
    telefono: string;
    celular: string;
    email: string;
    apoderado: string;
    tipoDocumentoId: number;
    generoId: number;
    comunaId: number;
    regionId: number;
    religionId: number;
    estadoCivilId: number;
    edad: string;
    religion: string;
    ciudadId: number;
    codigoPostal: string;
    nDepartamento: string;
    isReligion: boolean;
    identificacionOrigen: boolean;
    paisId: number;
    nacionalidadId: boolean;
    fotografiaUrl: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}
