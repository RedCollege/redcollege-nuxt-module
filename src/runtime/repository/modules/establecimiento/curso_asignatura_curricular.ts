import type { $Fetch } from 'ofetch';
import type { ICursoAsignaturaCurricular } from '~/src/runtime/models/Establecimiento/curso_asignatura_curricular';

export default class CursoAsignaturaCurricularModule {
    constructor(private fetcher: $Fetch) { }

    async getAsignaturaCurricularSige(cursoId: number): Promise<ICursoAsignaturaCurricular[]> {
        return this.fetcher(`/curso_asignatura_curricular/obtenerTodasByCursoId/${cursoId}`, {
            method: 'GET'
        })
    }
}
