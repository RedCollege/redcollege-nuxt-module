import type { DateTime } from 'luxon';
import type { IGradosSige } from './grados_sige';
import type { ILibro } from '../LibroDigital'

export interface ICurso {
    id: number;
    nombre: string;
    curso: string;
    seccion: string;
    isDinamico: boolean;
    isReciclado: boolean;
    tags: string;
    periodo: string;
    establecimientoId: number;
    sigeId: number;
    libro: ILibro;
    createdAt: DateTime;
    updatedAt: DateTime;
    sige?: IGradosSige;
    totalEstudiantes: number
}
