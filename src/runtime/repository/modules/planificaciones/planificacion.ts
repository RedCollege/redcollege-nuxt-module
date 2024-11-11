import type { $Fetch } from 'ofetch';
import type { IPlanificacion, IPlanificacionForm, IPlanificacionResponse } from '~/src/runtime/models/Planificacion';


interface GetAllProps {
    trashed?: boolean;
    periodo?: string;
    curso?: string;
    cobertura?: string;
    estado?: string;
    colaborativa?: boolean;
    asignatura?: string;
    page?: number;
    titulo?: string;
    establecimiento: number;
}

export default class PlanificacionModule {
    constructor(private fetcher: $Fetch) { }

    async getAll(props?: GetAllProps): Promise<IPlanificacionResponse> {
        return this.fetcher('/planificacion', {
            params: props,
            method: 'GET'
        });
    }

    async getPlanificacionById(planificacionId: number): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/${planificacionId}`, {
            method: 'GET'
        });
    }

    async duplicatePlanificacion(planificacionId: number): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/duplicate/${planificacionId}`, {
            method: 'POST',
            body: {}
        })
    }

    async savePlanificacion(data: IPlanificacionForm): Promise<IPlanificacion> {
        return this.fetcher('/planificacion', {
            method: 'POST',
            body: data
        })
    }

    async updatePlanificacion({ data, id }: { data: IPlanificacionForm, id: number }): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/${id}`, {
            method: 'PATCH',
            body: data
        })
    }

    async deleteTemporalPlanificacion(id: number): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/${id}`, {
            method: "DELETE"
        })
    }

    async restorePlanificacion(id: number): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/${id}/restore`, {
            method: 'PATCH'
        })
    }

    async deletePlanificacion(id: number): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/${id}/destroy`, {
            method: 'DELETE'
        })
    }

    async relateItemsEntradaCurricular(planificacionId: number, itemsIds: number[]): Promise<IPlanificacion> {
        return this.fetcher(`/planificacion/relateItems/${planificacionId}`, {
            method: 'POST',
            body: {
                itemsEntradaCurricular: itemsIds
            }
        })
    }

    async clonePlanificacion(asignaturaId: number, planificacionId: number): Promise<IPlanificacion[]> {
        return this.fetcher(`/planificacion/clone/${asignaturaId}`, {
            method: 'POST',
            body: {
                planificacionId: planificacionId
            }
        })
    }

}
