import { DateTime } from 'luxon';
import type { IUsuario } from "../Auth/usuario";

export interface IGrupo {
    id: number;
    nombre: string;
    usuarioId: number;
    color: string;
    establecimientoId: number;
    totalUsuarios: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    creador: IUsuario;
    usuarios: Array<IUsuario>;
}
