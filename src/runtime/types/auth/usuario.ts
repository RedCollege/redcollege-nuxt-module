import { DateTime } from 'luxon';
import type { IEstablecimiento } from "../establecimiento/establecimiento.ts";
import type { IPerfil } from "./perfil.ts";

export interface IUsuario {
    id: number;
    correo: string;
    clave: string;
    nombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    avatarUrl: string;
    created_at: DateTime;
    updated_at: DateTime;
    establecimientos: Array<IEstablecimiento>;
    perfil: IPerfil;
}