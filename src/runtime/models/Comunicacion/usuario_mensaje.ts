import { DateTime } from 'luxon';
import type { IMensaje } from "./mensaje.ts";
import type { IUsuario } from "../Auth/usuario.ts";

interface Meta {
    total: number | null,
    perPage: number | null,
    currentPage: number | null,
    lastPage: number | null,
    firstPage: number | null,
    firstPageUrl: string | null,
    lastPageUrl: string | null,
    nextPageUrl: string | null,
    previousPageUrl: string | null
}

export interface IUsuarioMensajeResponse {
    meta: Meta,
    data: IUsuarioMensaje[]
}


export interface IUsuarioMensaje {
    id: number;
    usuarioId: number;
    mensajeId: number;
    estadoId: number;
    isOpen: boolean;
    isDestinatario: boolean;
    isBorrador: boolean;
    tipoCopiaId: number;
    openFecha: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
    mensaje: IMensaje;
    usuario: IUsuario;
}
