import { DateTime } from "luxon";
import type { IUsuario } from "../";

export interface IComentario {
    fecha: string;
    comentarios: {
        id: number;
        comentario: string;
        editado: boolean;
        fechaHora: DateTime;
        usuario: IUsuario;
    }[];
}
