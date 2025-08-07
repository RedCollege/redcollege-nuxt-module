import { DateTime } from "luxon";
import type { IUsuario } from "../Auth/usuario.ts";
import type { IAdjunto } from "./adjunto.ts";
import type { IRegistroAtencion } from "../Enfermeria/registro_atencion.ts";
import type { IRegistroAccidente } from "../Enfermeria/registro_accidente.ts";
import type { IAdministracionMedicamento } from "../Enfermeria/administracion_medicamentos.js";

export interface IMensaje {
    id: number;
    asunto: string;
    mensaje: string;
    usuarioId: number;
    fechaEnvio: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    periodo: number;
    parentMensajeId: number;
    establecimientoId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    creador: IUsuario;
    adjuntos: Array<IAdjunto>;
    mensajePreview: string;
    totalDestinatarios: number;
    totalEnviados: number;
    estadoEnvioId: number;
    permitirRespuesta: boolean;
    registroAtencion: Array<IRegistroAtencion>;
    registroAccidente: Array<IRegistroAccidente>;
    administracionMedicamento: Array<IAdministracionMedicamento>;
    destinatarios: Array<IUsuario>;
}

export interface IMensajeForm {
    asunto: string;
    mensaje: string;
    periodo: number;
    establecimientoId: number;
    adjuntosIds: Array<number>;
    permitirRespuesta: boolean;
}
