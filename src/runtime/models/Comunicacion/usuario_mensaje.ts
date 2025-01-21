import { DateTime } from 'luxon';
import type { IMensaje } from "./mensaje.ts";
import type { IUsuario } from "../Auth/usuario.ts";
import type { IGrupo } from './grupo.js';
import type { ICurso } from '../index.js';
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

type ICursoConTotal = ICurso & { totalComunicados: number };
type IGrupoConTotal = IGrupo & { totalComunicados: number };
type IUsuarioConTotal = IUsuario & { totalComunicados: number };

// Extender la interfaz IEstadisticas
export interface IEstadisticas{
    mensajesPorCurso: ICursoConTotal[];
    mensajesPorGrupo: IGrupoConTotal[];
    usuarios: IUsuarioConTotal[];
}

export interface GrupoDestinatario {
    id: string;
    type: 'curso' | 'grupo' | 'personal';
    nombre: string;
    totalDestinatarios: number;
    areAllSelected: boolean;
    destinatarios: Destinatario[]
}

export interface Destinatario {
    id: number;
    nombre: string;
    isSelected: boolean;
}

