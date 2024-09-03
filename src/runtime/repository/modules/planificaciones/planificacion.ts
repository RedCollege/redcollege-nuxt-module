import type { $Fetch } from 'ofetch';

export default class PlanificacionModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(): Promise<[]> {
        return this.fetcher('/planificaciones');
    }
}
