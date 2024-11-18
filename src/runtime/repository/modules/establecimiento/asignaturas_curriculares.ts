import type { $Fetch } from 'ofetch';
import type { IAsignaturaCurricular } from '../../../models/Establecimiento/asignatura_curricular';

export default class AsignaturaCurricularModule {
    constructor(private fetcher: $Fetch) { }

    async getAsignaturaCurricularSige(cursoAsignaturaId: number, codigoSigeId: number, establecimientoId: number): Promise<IAsignaturaCurricular> {
        return this.fetcher(`/asignatura/obtenerAsignaturaCurricular/${cursoAsignaturaId}/${codigoSigeId}/${establecimientoId}`, {
            method: 'GET'
        })
    }
}
