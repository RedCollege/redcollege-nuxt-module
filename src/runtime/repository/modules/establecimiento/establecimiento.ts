import type { $Fetch } from 'ofetch';
import { ICursoAsignatura } from '../../../models/Establecimiento';




export default class EstablecimientoModule {
    constructor(private fetcher: $Fetch) {}


async getAsignaturasByCurso(cursoId: number): Promise<ICursoAsignatura> {
        return this.fetcher(`/establecimiento/curso/${cursoId}/asignaturas`, {
            method: 'GET'
        });
    }

}
