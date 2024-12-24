import { DateTime } from "luxon";

import type { IContenido } from "../contenido";
import type { ISugerencia } from "./sugerencia";
import type { IUsuario } from "../../Auth/usuario";


export interface IRegistroDua {
    id: number;
    contenidoId: number;
    deletedBy: number | null;
    deletedAt: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
    usuarios: Array<IUsuario>;
    sugerencias: Array<ISugerencia>;
    contenido: IContenido;
}