import type { $Fetch } from 'ofetch';
import { IAsignaturaCurricular } from '../../../models/Establecimiento/asignatura_curricular';

export default class AsignaturaCurricularModule {
    constructor(private fetcher: $Fetch) { }

    async getAsignaturaCurricularSige(codigoSige: number, sigeId: number): Promise<IAsignaturaCurricular> {
        return this.fetcher(`/asignatura/obtenerAsignaturaCurricular/${codigoSige}/${sigeId}`, {
            method: 'GET'
        })
    }
}