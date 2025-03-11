import type { $Fetch } from 'ofetch';
import type { IContadoresEnvioMensaje, IEstadisticas, IUsuarioMensaje, IUsuarioMensajeResponse } from '~/src/runtime/models/Comunicacion';

interface GetAllProps {
    trashed?: boolean;
    periodo?: number;
    estado?: number;
    page?: number;
    buscar?: string;
    usuario?: string;
    establecimiento?: number;
    isDestinatario?: boolean;
    fechas?: string[];
    curso?: number;
    estadoVisualizacion?: 'all' | 'leido' | 'no-leido'
}

interface EstadisticasProps {
    establecimientoId: number;
    periodo: number;
    mes?: string
}

export default class UsuarioMensajeModule {
    constructor(private fetcher: $Fetch) { }

    async getAll(props?: GetAllProps): Promise<IUsuarioMensajeResponse> {
        return this.fetcher('comunicaciones/usuarioMensaje/', {
            params: props,
            method: 'GET'
        });
    }

    async obtenerInformacionByMensajeId(mensajeId: number, props: GetAllProps): Promise<IUsuarioMensajeResponse> {
        return this.fetcher(`comunicaciones/usuarioMensaje/obtenerInformacionByMensajeId/${mensajeId}`, {
            params: props,
            method: 'GET'
        });
    }

    async obtenerContadoresEnvioMensaje(mensajeId: number): Promise<IContadoresEnvioMensaje> {
        return this.fetcher(`comunicaciones/usuarioMensaje/obtenerContadoresEnvioMensaje/${mensajeId}`, {
            method: 'GET'
        });
    }

    async obtenerEstadisticas(props: EstadisticasProps): Promise<IEstadisticas> {
        return this.fetcher(`comunicaciones/usuarioMensaje/obtenerEstadisticas`, {
            params: props,
            method: 'GET'
        });
    }

    async getAllMonitoreo(props?: GetAllProps): Promise<IUsuarioMensajeResponse> {
        return this.fetcher('comunicaciones/usuarioMensaje/monitoreo', {
            params: props,
            method: 'GET'
        });
    }

    async actualizarMensajeEstadoLectura(mensajeId: number, usuarioId: number): Promise<IUsuarioMensaje> {
        return this.fetcher(`comunicaciones/usuarioMensaje/actualizarMensajeEstadoLectura/${mensajeId}`, {
            method: 'PATCH',
            body: {
                usuarioId
            }
        });
    }

    async actualizarEstadoUsuarioMensaje(usuarioMensajeId: number, estado: number): Promise<IUsuarioMensaje> {
        return this.fetcher(`comunicaciones/usuarioMensaje/actualizarEstadoUsuarioMensaje/${usuarioMensajeId}`, {
            method: 'PATCH',
            body: {
                estado
            }
        });
    }

}
