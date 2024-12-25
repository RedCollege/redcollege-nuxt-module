import type { $Fetch } from "ofetch";
import type { IAdecuacionCurricular } from "~/src/runtime/models";

export default class AdecuacionCurricularModule {
    constructor(private fetcher: $Fetch) {}
    async obtenerAdecuacionesPorUnidad(
        unidadId: number,
        page: number = 1
    ): Promise<IAdecuacionCurricular[]> {
        return this.fetcher(`/adecuaciones-curriculares/unidad/${unidadId}`, {
            method: "GET",
            query: { page },
        });
    }
    async obtenerAdecuacionPorContenidoId(
        id: number
    ): Promise<IAdecuacionCurricular> {
        return this.fetcher(`/adecuaciones-curriculares/contenido/${id}`, {
            method: "GET",
        });
    }

    async crearNuevaAdecuacion(
        data: IAdecuacionCurricular
    ): Promise<IAdecuacionCurricular> {
        return this.fetcher("/adecuaciones-curriculares", {
            method: "POST",
            body: data,
        });
    }

    async actualizarAdecuacion(
        id: number,
        data: Partial<IAdecuacionCurricular>
    ): Promise<IAdecuacionCurricular> {
        return this.fetcher(`/adecuaciones-curriculares/${id}`, {
            method: "PATCH",
            body: data,
        });
    }

    async eliminarAdecuacion(id: number): Promise<IAdecuacionCurricular> {
        return this.fetcher(`/adecuaciones-curriculares/${id}`, {
            method: "DELETE",
        });
    }
}
