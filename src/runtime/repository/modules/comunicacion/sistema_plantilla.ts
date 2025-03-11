import type { $Fetch } from 'ofetch';
import type { ITipoPlantilla } from '~/src/runtime/models/Comunicacion/tipo_plantilla';

export default class SistemaPlantillaModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerAllPlantillaSistema(): Promise<Array<ITipoPlantilla>> {
        return this.fetcher(`comunicaciones/sistemaPlantillas/obtenerAllPlantillaSistema`, {
            method: 'GET'
        });
    }
}
