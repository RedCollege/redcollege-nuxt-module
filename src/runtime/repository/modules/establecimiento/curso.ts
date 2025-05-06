import type { $Fetch } from 'ofetch';
import type { ICurso, ICursoAsignatura, IGradosSige } from '../../../models';
import type { IUsuario } from '~/src/runtime/models/Auth/usuario';


export default class CursoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerCurso(cursoId: number): Promise<ICurso> {
        return this.fetcher(`/curso/obtenerCurso/${cursoId}`, {
            method: 'GET'
        })
    }

    async getGradosSige(establecimientoId: number, year: number): Promise<IGradosSige[]> {
        return this.fetcher(`/curso/obtenerNivelesSige/${establecimientoId}/?year=${year}`, {
            method: 'GET'
        })
    }

    async obtenerAsignaturasPorGradoSige(sigeId: number, periodo: number, establecimientoId: number): Promise<ICursoAsignatura[]> {
        return this.fetcher(`/curso/obtenerAsignaturasBySigeId/${sigeId}/?establecimientoId=${establecimientoId}&periodo=${periodo}`, {
            method: 'GET'
        })
    }

    async obtenerEstudiantes(cursoId: number): Promise<IUsuario[]> {
        return this.fetcher(`/curso/obtenerEstudiantes/${cursoId}`, {
            method: 'GET'
        })
    }

}
