import type { $Fetch } from 'ofetch';
import type { IEspecialidad } from '~/src/runtime/models';

export default class EspecialidadModule {
    constructor(private fetcher: $Fetch) { }

    async getAll(): Promise<IEspecialidad[]> {
        return this.fetcher(`/especialidad/getAll`, {
            method: 'GET'
        })
    }

}
