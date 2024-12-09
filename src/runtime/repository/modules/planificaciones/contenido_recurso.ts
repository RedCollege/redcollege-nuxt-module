import type { $Fetch } from 'ofetch';
import type { IContenidoRecurso } from '../../../models/Planificacion/contenido';

export default class ContenidoRecursoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerRecursosPorContenido(contenidoId: number): Promise<IContenidoRecurso[]> {
        return this.fetcher(`/contenidos/${contenidoId}/recursos`);
    }

    async crearNuevoRecurso(data: { contenidoId: number; descripcion: string }): Promise<IContenidoRecurso> {
        return this.fetcher('/contenidos/recursos', {
            method: 'POST',
            body: data
        });
    }

    async obtenerRecursoPorId(id: number): Promise<IContenidoRecurso> {
        return this.fetcher(`/contenidos/recursos/${id}`);
    }

    async actualizarRecurso(id: number, data: { descripcion: string }): Promise<IContenidoRecurso> {
        return this.fetcher(`/contenidos/recursos/${id}`, {
            method: 'PATCH',
            body: data
        });
    }

    async eliminarRecurso(id: number): Promise<IContenidoRecurso> {
        return this.fetcher(`/contenidos/recursos/${id}`, {
            method: 'DELETE'
        });
    }
} 