import type { $Fetch } from 'ofetch';
import type { ICursoAsignatura } from '../../../models/Establecimiento';




export default class EstablecimientoModule {
    constructor(private fetcher: $Fetch) { }


    async getAsignaturasByCurso(cursoId: number): Promise<ICursoAsignatura> {
        return this.fetcher(`/establecimiento/curso/${cursoId}/asignaturas`, {
            method: 'GET'
        });
    }

    async getAllCursosByEstablecimiento(establecimientoId: number, periodo: number): Promise<ICursoAsignatura[]> {
        return this.fetcher(`/establecimiento/${establecimientoId}/cursos`, {
            method: 'GET',
            params: { periodo }
        });
    }

}
