import { DateTime } from "luxon";
import type { IUsuario } from "..";
import type { IMatricula } from "./matricula";

export interface IAutorizadoRetiro {
    id: number;
    Rut: string;
    usuarioId: number;
    matriculaId: number;
    relacion: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    matricula: IMatricula;
    usuario: IUsuario;
}
