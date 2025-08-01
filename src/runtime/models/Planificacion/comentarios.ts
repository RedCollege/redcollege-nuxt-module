import type { DateTime } from "luxon";
import type { IUsuario } from "../";

export interface IComentario {
    fecha: DateTime;
    comentarios: {
        id: number;
        comentario: string;
        editado: boolean;
        fechaHora: DateTime;
        usuario: IUsuario;
        recibido: boolean;
    }[];
}
