import { DateTime } from 'luxon';
import type { IAdjunto } from "./adjunto.ts";

export interface IUsuarioPlantilla {
    id: number;
    nombre: string;
    usuarioId: number;
    mensaje: string;
    asunto: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    adjuntos: Array<IAdjunto>;
}

export interface IUsuarioPlantillaForm {
    nombre: string;
    mensaje: string;
    asunto: string;
    adjuntoIds: Array<number>;
}
