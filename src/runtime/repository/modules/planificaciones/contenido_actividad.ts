import type { $Fetch } from 'ofetch';
import type { IContenidoActividad } from '../../../models/Planificacion/contenido';

export default class ContenidoActividadModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerActividadesPorContenido(contenidoId: number): Promise<IContenidoActividad[]> {
        return this.fetcher(`/contenidos/${contenidoId}/actividades`);
    }

    async crearNuevaActividad(data: { contenidoId: number; descripcion: string }): Promise<IContenidoActividad> {
        return this.fetcher('/contenidos/actividades', {
            method: 'POST',
            body: data
        });
    }

    async obtenerActividadPorId(id: number): Promise<IContenidoActividad> {
        return this.fetcher(`/contenidos/actividades/${id}`);
    }

    async actualizarActividad(id: number, data: { contenidoId: number; descripcion: string }): Promise<IContenidoActividad> {
        return this.fetcher(`/contenidos/actividades/${id}`, {
            method: 'PATCH',
            body: data
        });
    }

    async eliminarActividad(id: number): Promise<IContenidoActividad> {
        return this.fetcher(`/contenidos/actividades/${id}`, {
            method: 'DELETE'
        });
    }
} 