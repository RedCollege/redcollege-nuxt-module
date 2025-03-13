import type { $Fetch } from 'ofetch';
import type { ITipoAccidente, ITipoAccidenteForm } from '~/src/runtime/models';

export default class TipoAccidenteModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllTipoAccidenteByEstablecimiento(establecimientoId: number|string): Promise<ITipoAccidente[]> {
        return this.fetcher(`/enfermeria/tipo-accidente/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveTipoAccidente(data: ITipoAccidenteForm): Promise<ITipoAccidente> {
        return this.fetcher('/enfermeria/tipo-accidente', {
            method: 'POST',
            body: data
        })
    }

    async deleteTipoAccidente(id: number): Promise<ITipoAccidente> {
        return this.fetcher(`/enfermeria/tipo-accidente/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}