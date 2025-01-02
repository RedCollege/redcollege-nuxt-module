import type { $Fetch } from 'ofetch';
import type { IMensaje } from '~/src/runtime/models/Comunicacion';

export default class MensajeModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerById(mensajeId: number): Promise<IMensaje> {
        return this.fetcher(`comunicaciones/mensaje/obtenerById/${mensajeId}`, {
            method: 'GET'
        });
    }
}
