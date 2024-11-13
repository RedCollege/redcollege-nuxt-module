import type { $Fetch } from 'ofetch';
import type { ICursoAsignatura, IGradosSige } from '../../../models';


export default class CursoModule {
    constructor(private fetcher: $Fetch) { }

    async getGradosSige(establecimientoId: number, year: number): Promise<IGradosSige[]> {
        return this.fetcher(`/curso/obtenerNivelesSige/${establecimientoId}/?year=${year}`, {
            method: 'GET'
        })
    }

    async obtenerAsignaturasPorGradoSige(sigeId: number): Promise<ICursoAsignatura[]> {
        return this.fetcher(`/curso/obtenerNivelesSige/${sigeId}`, {
            method: 'GET'
        })
    }
}