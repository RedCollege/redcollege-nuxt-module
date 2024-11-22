import type { $Fetch } from 'ofetch';
import type { IUnidad, IUnidadForm } from '~/src/runtime/models/Planificacion';
import type { IItemEntradaCurricular } from '../../../models';
import type { IArchivo } from '../../../models/General/archivo';



export default class UnidadModule {
    constructor(private fetcher: $Fetch) { }

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

    async updateUnidad({ data, id }: { data: IUnidadForm, id: number }): Promise<IUnidad> {
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

    async relateItemsUnidades(planificacionId: number, unidadId: number, itemEntradaCurricularId: number[], itemId: number): Promise<IItemEntradaCurricular> {
        return this.fetcher(`/unidades/relateItemUnidad/${planificacionId}/${itemId}`, {
            method: 'POST',
            body: {
                unidadId: unidadId,
                itemsIds: itemEntradaCurricularId
            }
        })
    }

    async getUnidadesByPlanificacion(planificacionId: number): Promise<IUnidad[]> {
        return this.fetcher(`/unidades/getUnidadesByPlanificacion/${planificacionId}`, {
            method: 'GET'
        })
    }

    async asociarArchivo(unidadId: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/unidades/${unidadId}/asociar-archivo`, {
            method: 'POST',
            body: {
                archivoId
            }
        })
    }

    async softDeleteArchivoAsociado(unidadId: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/unidades/${unidadId}/soft-delete-archivo`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        })
    }

    async destroyArchivo(unidadId: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/unidades/${unidadId}/destroy-archivo`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        })
    }
}