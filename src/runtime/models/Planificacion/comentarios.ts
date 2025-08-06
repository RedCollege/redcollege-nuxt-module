import type { DateTime } from "luxon";
import type { IUsuario } from "../";

export interface IComentariosResponse {
    fecha: DateTime;
    comentarios: IComentario[];
}

export interface IComentario {
    id: number;
    comentario: string;
    editado: boolean;
    fechaHora: DateTime;
    usuario: IUsuario;
    recibido: boolean;
}
