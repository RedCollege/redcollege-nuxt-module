import type { $Fetch } from 'ofetch';
import type { IItemEntradaCurricular } from '../../../models';
import type { IArchivo } from '../../../models/General/archivo';
import type { IContenido, IContenidoForm } from '../../../models/Planificacion/contenido';
import type { DateTime } from 'luxon';

export default class ContenidoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerContenidosPorPlanificacion(planificacionId: number): Promise<IContenido[]> {
        return this.fetcher(`/contenidos/obtenerContenidosPorPlanificacion/${planificacionId}`, {
            method: 'GET'
        });
    }

    async obtenerContenidosPorUnidad(unidadId: number): Promise<IContenido[]> {
        return this.fetcher(`/contenidos/unidad/${unidadId}`, {
            method: 'GET'
        });
    }

    async obtenerContenidoPorId(id: number): Promise<IContenido> {
        return this.fetcher(`/contenidos/${id}`, {
            method: 'GET'
        });
    }

    async crearNuevoContenido(data: IContenidoForm): Promise<IContenido> {
        return this.fetcher('/contenidos', {
            method: 'POST',
            body: data
        });
    }

    async actualizarContenido(id: number, data: Partial<IContenidoForm>): Promise<IContenido> {
        return this.fetcher(`/contenidos/${id}`, {
            method: 'PATCH',
            body: data
        });
    }

    async eliminarContenido(id: number): Promise<IContenido> {
        return this.fetcher(`/contenidos/${id}`, {
            method: 'DELETE'
        });
    }

    async obtenerItemsEntrada(id: number): Promise<IItemEntradaCurricular[]> {
        return this.fetcher(`/contenidos/${id}/items`, {
            method: 'GET'
        });
    }

    async asociarItemsAContenido(id: number, itemsIds: number[]): Promise<IContenido> {
        return this.fetcher(`/contenidos/${id}/items`, {
            method: 'POST',
            body: {
                itemsIds
            }
        });
    }

    async asociarArchivoAContenido(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/contenidos/${id}/archivos`, {
            method: 'POST',
            body: {
                archivoId
            }
        });
    }

    async softDeleteArchivoAsociado(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/contenidos/${id}/archivos/soft`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        });
    }

    async destroyArchivo(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/contenidos/${id}/archivos`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        });
    }

    async obtenerDiasHabilesContenido(contenidoId: number): Promise<DateTime[]> {
        return this.fetcher(`/contenidos/obtenerDiasHabilesContenido/${contenidoId}`, {
            method: 'GET'
        });
    }

    async duplicarContenido(contenidoId: number): Promise<IContenido> {
        return this.fetcher(`/contenidos/duplicarContenido/${contenidoId}`, {
            method: "POST"
        })
    }
}
