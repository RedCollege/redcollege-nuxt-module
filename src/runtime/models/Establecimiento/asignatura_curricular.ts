import { DateTime } from 'luxon';
import type { IEntradaCurricular } from '../Curriculum/entrada_curricular';

export interface IAsignaturaCurricular {
    id: number;
    nombre: string;
    gradoEducacionalId: number;
    itemEducacionalId: number;
    nivelEducacionalId: number;
    itemConfiguracionId: number;
    establecimientoId: number;
    asignaturaParentId: number;
    codigoSige: number;
    sigeId: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    entradasCurriculares: Array<IEntradaCurricular>;
}

export interface IAsignatura {
    id: number;
    name: string;
}