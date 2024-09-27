import type { $Fetch } from 'ofetch';
import type { IUnidad, IUnidadResponse } from '~/src/runtime/models/Planificacion';

export default class UnidadModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(planificacionId: number): Promise<IUnidadResponse[]> {
        return this.fetcher(`/unidades/planificacion/${planificacionId}`);
    }

    async getUnidadById(unidadId: number): Promise<IUnidadResponse> {
        return this.fetcher(`/unidades/${unidadId}`);
    }

    async saveUnidad(data: IUnidad): Promise<IUnidadResponse> {
        return this.fetcher(`/unidades`, {
            method: 'POST',
            body: data
        })
    }

    async updateUnidad({data, id}: { data: IUnidad, id: number} ): Promise<IUnidadResponse> {
        return this.fetcher(`/unidades/${id}`, {
            method: 'PUT',
            body: data
        })
    }

    async deleteUnidad(id: number): Promise<IUnidadResponse> {
        return this.fetcher(`/unidades/${id}`, {
            method: 'DELETE'
        })
    }
}