import type { DateTime } from 'luxon';
import type { ICursoAsignatura, ICurso } from '../Establecimiento';
import type { IEstablecimiento, IUsuario } from '../../types';

export interface IPlanificacion {
    id: number;
    titulo: string;
    periodo: string;
    isColaborativa: boolean;
    cobertura: number;
    estadoId: number;
    cursoId: number;
    establecimientoId: number;
    usuarioId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime;
    deletedBy: number | null;
    curso: ICurso;
    establecimiento: IEstablecimiento;
    usuario: IUsuario;
    colaboradores: Array<IUsuario>;
    asignaturas: Array<ICursoAsignatura>;
}

export interface IPlanificacionForm {
    titulo: string,
    periodo: string,
    cobertura: number,
    isColaborativa: boolean,
    estadoId: number,
    cursoId: number,
    establecimientoId: number,
    colaboradores: number[],
    asignaturas: number[]
}
