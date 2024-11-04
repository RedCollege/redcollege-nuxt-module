import type { $Fetch } from 'ofetch';
import type { IUnidad, IUnidadForm } from '~/src/runtime/models/Planificacion';

export default class UnidadModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(planificacionId: number): Promise<IUnidad[]> {
        return this.fetcher(`/unidades/planificacion/${planificacionId}`);
    }

    async getUnidadById(unidadId: number): Promise<IUnidad> {
        return this.fetcher(`/unidades/${unidadId}`);
    }

    async saveUnidad(data: IUnidadForm): Promise<IUnidad> {
        return this.fetcher(`/unidades`, {
            method: 'POST',
            body: data
        })
    }

    async updateUnidad({data, id}: { data: IUnidadForm, id: number} ): Promise<IUnidad> {
        return this.fetcher(`/unidades/${id}`, {
            method: 'PATCH',
            body: data
        })
    }

    async deleteUnidad(id: number): Promise<IUnidad> {
        return this.fetcher(`/unidades/${id}`, {
            method: 'DELETE'
        })
    }
}