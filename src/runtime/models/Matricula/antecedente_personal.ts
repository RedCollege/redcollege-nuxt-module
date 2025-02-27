import { DateTime } from "luxon";
import type { ICiudad } from "./antecedente_personal/ciudad";
import type { IComuna } from "./antecedente_personal/comuna";
import type { IEstadoCivil } from "./antecedente_personal/estado_civil";
import type { IGenero } from "./antecedente_personal/genero";
import type { IPais } from "./antecedente_personal/pais";
import type { IRegion } from "./antecedente_personal/region";
import type { IReligion } from "./antecedente_personal/religion";
import type { ITipoDocumento } from "./antecedente_personal/tipo_documento";
import type { IOrigenIndigena } from "./antecedente_personal/origen_indigena";

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
    tipoDocumento: ITipoDocumento;
    genero: IGenero;
    comuna: IComuna;
    region: IRegion;
    religiones: IReligion;
    estadoCivil: IEstadoCivil;
    origenIndigena: IOrigenIndigena;
    ciudad: ICiudad;
    pais: IPais;
    nacionalidad: IPais;
}
