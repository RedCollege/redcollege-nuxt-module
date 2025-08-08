import { DateTime } from "luxon";
import type { IUsuario } from "../Auth/usuario.ts";
import type { IRegistroAtencion } from "../Enfermeria/registro_atencion.ts";
import type { IRegistroAccidente } from "../Enfermeria/registro_accidente.js";
import type { IAdministracionMedicamento } from "../Enfermeria/administracion_medicamentos.js";

export enum TipoRegistro {
    ATENCION = 'atencion',
    ACCIDENTE = 'accidente', 
    ADMINISTRACION_MEDICAMENTO = 'administracion_medicamento'
}

export interface IViaTelefonicaForm {
    fechaReporte: DateTime;
    isContactoEstablecido: boolean;
    observaciones?: string;
    tipoRegistro: TipoRegistro;
    apoderados: Array<number>;
}

export interface IViaTelefonica {
    id: number;
    fechaReporte: DateTime;
    isContactoEstablecido: boolean;
    observaciones: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    apoderados: Array<IUsuario>;
    registroAtencion: Array<IRegistroAtencion>;
    registroAccidente: Array<IRegistroAccidente>;
    administracionMedicamento: Array<IAdministracionMedicamento>;
}