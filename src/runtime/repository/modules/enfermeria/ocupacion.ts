import type { $Fetch } from 'ofetch';
import type { IOcupacion, IOcupacionForm } from '~/src/runtime/models';

export default class OcupacionModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllOcupacionByEstablecimiento(establecimientoId: number|string): Promise<IOcupacion[]> {
        return this.fetcher(`/enfermeria/ocupacion/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveOcupacion(data: IOcupacionForm): Promise<IOcupacion> {
        return this.fetcher('/enfermeria/ocupacion', {
            method: 'POST',
            body: data
        })
    }

    async deleteOcupacion(id: number): Promise<IOcupacion> {
        return this.fetcher(`/enfermeria/ocupacion/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}