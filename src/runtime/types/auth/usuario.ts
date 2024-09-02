import { DateTime } from 'luxon';
import type { TEstablecimiento } from "../establecimiento/establecimiento.ts";
import type { TPerfil } from "./perfil.ts";

export type TUsuario = {
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
    establecimientos: Array<TEstablecimiento>;
    perfil: TPerfil;
}