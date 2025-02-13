import { DateTime } from 'luxon';
import type { IUsuario } from "../Auth/usuario";

export interface IGrupo {
    id: number;
    nombre: string;
    usuarioId: number;
    color: string;
    establecimientoId: number;
    totalUsuarios: number;
    periodo: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    creador: IUsuario;
    usuarios: Array<IUsuario>;
}

export interface IGrupoForm {
    nombre: string;
    establecimientoId: number;
    periodo: number;
}

