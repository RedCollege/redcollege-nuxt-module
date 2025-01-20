import type { $Fetch } from 'ofetch';
import type { ITratamiento, ITratamientoForm } from '~/src/runtime/models';

export default class TratamientoModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllTratamientoByEstablecimiento(establecimientoId: number|string): Promise<ITratamiento[]> {
        return this.fetcher(`/enfermeria/tratamiento/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveTratamiento(data: ITratamientoForm): Promise<ITratamiento> {
        return this.fetcher('/enfermeria/tratamiento', {
            method: 'POST',
            body: data
        })
    }

    async deleteTratamiento(id: number): Promise<ITratamiento> {
        return this.fetcher(`/enfermeria/tratamiento/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}