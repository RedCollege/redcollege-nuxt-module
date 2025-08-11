import { DateTime } from "luxon";
import type { IEstablecimiento } from "../Establecimiento/establecimiento";
import type { IPerfil } from "./perfil";
import type { IRol } from "../Establecimiento/rol";
import type { ICurso } from "../Establecimiento/curso";
import type { IMatricula } from "../Matricula";
import type { IEspecialidad } from "../Establecimiento/especialidad";
import type { IApoderadoUsuario } from "../Establecimiento/apoderado_usuario";
export interface IUsuario {
    id: number;
    correo: string;
    clave: string;
    rut: string;
    /**
     * Solo contiene el primer nombre del usuario.
     * Es preferible usar `nombreCompleto` si necesitas todo el nombre.
     */
    nombre: string;
    cargo: string;
    /**
     * Solo contiene el segundo nombre del usuario.
     * Es preferible usar `nombreCompleto` si necesitas todo el nombre.
     */
    segundoNombre: string;
    /**
     * Solo contiene el apellido paterno del usuario.
     * Es preferible usar `nombreCompleto` si necesitas todo el nombre.
     */
    apellidoPaterno: string;
    /**
     * Solo contiene el apellido materno del usuario.
     * Es preferible usar `nombreCompleto` si necesitas todo el nombre.
     */
    apellidoMaterno: string;
    avatarUrl: string;
    telefono: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    establecimientos: Array<IEstablecimiento>;
    perfil: IPerfil;
    roles: Array<IRol>;
    cursos: Array<ICurso>;
    matriculas: Array<IMatricula>;
    especialidades: Array<IEspecialidad>;
    apoderados: Array<IApoderadoUsuario>;
    /**
     * Contiene el nombre completo del usuario.
     */
    nombreCompleto: string;
    /**
     * Contiene las inciales del usuario.
     */
    iniciales: string;
    fechaInicioCurso: DateTime;
    fechaRetiroCurso: DateTime;
    numeroLista: number | null;
    cursoUsuarioId: number;
    /**
     * 1. Profesor Jefe
     * 2. Profesor Auxiliar
     */
    tipoProfesorId: number | null
}

export interface IUsuarioUpdate {
    nombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    rut: string;
    correo: string;
    especialidadesIds: Array<number>;
}
