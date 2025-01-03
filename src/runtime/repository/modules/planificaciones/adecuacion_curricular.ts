import type { $Fetch } from "ofetch";
import type {
    IAdecuacionCurricular,
    IAdecuacionCurricularPaginated,
} from "~/src/runtime/models";

export default class AdecuacionCurricularModule {
    constructor(private fetcher: $Fetch) {}
    async obtenerAdecuacionesPorUnidad(
        unidadId: number,
        page: number = 1,
        nombre?: string,
        asignatura?: string
    ): Promise<IAdecuacionCurricularPaginated> {
        return this.fetcher(`/adecuaciones-curriculares/unidad/${unidadId}`, {
            method: "GET",
            query: { page, nombre, asignatura },
        });
    }
    async obtenerAdecuacionesPorContenidoId(
        id: number
    ): Promise<IAdecuacionCurricular[]> {
        return this.fetcher(`/adecuaciones-curriculares/contenido/${id}`, {
            method: "GET",
        });
    }

    async obtenerAdecuacionPorId(id: number): Promise<IAdecuacionCurricular> {
        return this.fetcher(`/adecuaciones-curriculares/${id}`, {
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
