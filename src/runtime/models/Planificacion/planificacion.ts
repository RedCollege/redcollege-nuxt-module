import type { DateTime } from 'luxon';
import type { ICursoAsignatura, ICurso } from '../Establecimiento';
import type { IEstablecimiento, IUsuario } from '../../types';

export interface IPlanificacionResponse {
    id: number;
    titulo: string;
    periodo: string;
    is_colaborativa: boolean;
    cobertura: number;
    estado_id: number;
    curso_id: number;
    establecimiento_id: number;
    usuario_id: number;
    created_at: DateTime;
    updated_at: DateTime;
    deleted_at: DateTime;
    deleted_by: number | null;
    curso: ICurso;
    establecimiento: IEstablecimiento;
    usuario: IUsuario;
    colaboradores: Array<IUsuario>;
    asignaturas: Array<ICursoAsignatura>;
}

export interface IPlanificacion {
    titulo: string,
    periodo: string,
    cobertura: number,
    is_colaborativa: boolean,
    estado_id: number,
    curso_id: number,
    establecimiento_id: number,
    colaboradores: number[],
    asignaturas: number[]
}
