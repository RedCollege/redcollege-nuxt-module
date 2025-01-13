import type { $Fetch } from 'ofetch';
import type { IUsuarioMensajeResponse } from '~/src/runtime/models/Comunicacion';

interface GetAllProps {
    trashed?: boolean;
    periodo?: number;
    estado?: number;
    page?: number;
    buscar?: string;
    usuario?: string;
    establecimiento?: number;
    isDestinatario?: boolean;
    estadoVisualizacion?: 'all' | 'leido' | 'no-leido'
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

    async getAllMonitoreo(props?: GetAllProps): Promise<IUsuarioMensajeResponse> {
        return this.fetcher('comunicaciones/usuarioMensaje/monitoreo', {
            params: props,
            method: 'GET'
        });
    }

}
