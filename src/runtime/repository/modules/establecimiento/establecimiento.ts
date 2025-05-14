import type { $Fetch } from 'ofetch';
import type { ICursoAsignatura, IEstablecimientoResponse } from '../../../models/Establecimiento';
import type { ICurso } from '~/src/runtime/models/Establecimiento/curso';
import type { IUsuario } from '~/src/runtime/models/Auth/usuario';

export default class EstablecimientoModule {
    constructor(private fetcher: $Fetch) { }


    async obtenerEstablecimientos(search: string, page: number): Promise<IEstablecimientoResponse> {
        return this.fetcher(`/establecimiento/obtenerEstablecimientos?search=${search}&page=${page}`, {
            method: 'GET'
        });
    }

    async getAsignaturasByCurso(cursoId: number): Promise<ICursoAsignatura[]> {
        return this.fetcher(`/establecimiento/curso/${cursoId}/asignaturas`, {
            method: 'GET'
        });
    }

    async getAllCursosByEstablecimiento(establecimientoId: number, periodo: number, isDinamico?: boolean): Promise<ICurso[]> {
        return this.fetcher(`/establecimiento/${establecimientoId}/cursos`, {
            method: 'GET',
            params: { periodo, isDinamico }
        });
    }

    async getColaboradoresByEstablecimiento(establecimientoId: number): Promise<IUsuario[]> {
        return this.fetcher(`/establecimiento/${establecimientoId}/personal`, {
            method: 'GET',

        });
    }

}
