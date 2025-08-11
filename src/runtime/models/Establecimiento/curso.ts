import type { DateTime } from 'luxon';
import type { IGradosSige } from './grados_sige';
import type { ILibro } from '../LibroDigital'

export interface ICurso {
    id: number;
    nombre: string;
    curso: string;
    seccion: string;
    isDinamico: boolean;
    periodo: string;
    establecimientoId: number;
    sigeId: number;
    libro?: ILibro;
    createdAt: DateTime;
    updatedAt: DateTime;
    /**
     * Contiene la información del codigo sige del curso
     */
    sige?: IGradosSige;
    totalEstudiantes: number | null;
    totalCursoAsignaturas: number | null;
    totalHorarios: number | null;
    /**
     * Contiene el nombre completo del curso.
     */
    nombreCompleto: string;
    cupos: number;
}
