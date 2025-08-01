import type { $Fetch } from 'ofetch';
import type { ICursoAsignatura } from '~/src/runtime/models/Establecimiento/curso_asignatura';

export default class CursoAsignaturaModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerTodasByCursoId(cursoId: number): Promise<ICursoAsignatura[]> {
        return this.fetcher(`/curso_asignatura/obtenerTodasByCursoId/${cursoId}`, {
            method: 'GET'
        })
    }
}
