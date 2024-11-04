import { DateTime } from 'luxon';
import type { IEstablecimiento } from "../Establecimiento/establecimiento";
import type { IPerfil } from "./perfil";
import type { IRol } from '../Establecimiento/rol';

export interface IUsuario {
    id: number;
    correo: string;
    clave: string;
    nombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    avatarUrl: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    establecimientos: Array<IEstablecimiento>;
    perfil: IPerfil;
    roles: Array<IRol>;
}
