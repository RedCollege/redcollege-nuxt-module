import type { $Fetch } from "ofetch";
import type {
    IComentariosResponse,
    IComentario,
} from "../../../models/Planificacion/comentarios";

export default class ComentarioModule {
    constructor(private fetcher: $Fetch) {}

    async getByPlanificacion(id: number): Promise<IComentariosResponse[]> {
        return this.fetcher(`/comentarios/planificacion/${id}`, {
            method: "GET",
        });
    }

    async enviarComentario(
        planificacionId: number,
        comentario: string,
    ): Promise<IComentario> {
        return this.fetcher(`/comentarios/`, {
            method: "POST",
            body: {
                planificacionId,
                comentario,
            },
        });
    }

    async editarComentario(
        comentarioId: number,
        comentario: string,
    ): Promise<IComentario> {
        return this.fetcher(`/comentarios/${comentarioId}`, {
            method: "PATCH",
            body: {
                comentario,
            },
        });
    }

    async eliminarComentario(comentarioId: number): Promise<IComentario> {
        return this.fetcher(`/comentarios/${comentarioId}`, {
            method: "Delete",
        });
    }
}
