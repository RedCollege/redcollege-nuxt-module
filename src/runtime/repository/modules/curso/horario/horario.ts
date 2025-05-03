import type { $Fetch } from 'ofetch';
import type { IHorario } from '~/src/runtime/models/Curso/Horario/horario/horario';


export default class HorarioModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerHorario(horarioId: number): Promise<IHorario> {
        return this.fetcher(`/curso/horario/obtenerHorario/${horarioId}`, {
            method: 'GET'
        })
    }

    async obtenerUltimoHorarioActivo(cursoId: number): Promise<IHorario> {
        return this.fetcher(`curso/horario/obtenerUltimoHorarioActivo/${cursoId}`, {
            method: 'GET'
        });
    }

    async obtenerHorariosByCursoId(cursoId: number): Promise<IHorario[]> {
        return this.fetcher(`curso/horario/obtenerHorariosByCursoId/${cursoId}`, {
            method: 'GET'
        });
    }

}
