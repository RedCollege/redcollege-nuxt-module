import type { $Fetch } from 'ofetch';
import type { IAsignatura, IAsignaturaCurricular } from '../../../models/Establecimiento/asignatura_curricular';
import type { ICursoCobertura } from '~/src/runtime/models';

export default class AsignaturaCurricularModule {
    constructor(private fetcher: $Fetch) { }

    async getAsignaturaCurricularSige(cursoAsignaturaId: number, codigoSigeId: number, establecimientoId: number): Promise<IAsignaturaCurricular> {
        return this.fetcher(`/asignatura/obtenerAsignaturaCurricular/${cursoAsignaturaId}/${codigoSigeId}/${establecimientoId}`, {
            method: 'GET'
        })
    }

    async getAsignaturasPorEstablecimiento(establecimientoId: number): Promise<IAsignatura[]> {
        return this.fetcher(`/asignatura/porEstablecimiento/${establecimientoId}`, {
            method: 'GET'
        })
    }

    async getCursosPorAsignatura(asignaturaId: number, establecimientoId: number): Promise<ICursoCobertura[]> {
        return this.fetcher(`/asignatura/cursos/${asignaturaId}/${establecimientoId}`, {
            method: 'GET'
        })
    }
}