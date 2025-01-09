import type { $Fetch } from 'ofetch';
import type { GrupoDestinatario, IMensaje, IMensajeForm } from '~/src/runtime/models/Comunicacion';

export default class MensajeModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerById(mensajeId: number): Promise<IMensaje> {
        return this.fetcher(`comunicaciones/mensaje/obtenerById/${mensajeId}`, {
            method: 'GET'
        });
    }

    async enviarMensaje(mensaje: IMensajeForm, gruposDestinatarios: GrupoDestinatario[]): Promise<IMensaje> {
        return this.fetcher(`comunicaciones/mensaje/enviarMensaje`, {
            method: 'POST',
            body: {
                mensaje,
                gruposDestinatarios
            }
        });
    }

}
