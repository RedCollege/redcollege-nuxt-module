import { DateTime } from 'luxon';
import type { IUsuario } from "../Auth/usuario.ts";
import type { IAdjunto } from "./adjunto.ts";

export interface IMensaje {
    id: number;
    asunto: string;
    mensaje: string;
    usuarioId: number;
    fechaEnvio: DateTime;
    deletedAt: DateTime | null;
    deletedBy: number | null;
    periodo: string;
    parentMensajeId: number;
    establecimientoId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    creador: IUsuario;
    adjuntos: Array<IAdjunto>;
    mensajePreview: string;
}