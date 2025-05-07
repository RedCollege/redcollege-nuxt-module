import type { $Fetch } from 'ofetch';
import type { IHorarioDiaAsignatura } from '~/src/runtime/models';

export default class HorarioDiaAsignaturaModule {
    constructor(private fetcher: $Fetch) { }

    async destroyBloque(bloqueId: number): Promise<IHorarioDiaAsignatura> {
        return this.fetcher(`/curso/horario/horario_dia_asignatura/destroyBloque/${bloqueId}`, {
            method: 'DELETE'
        })
    }

}
