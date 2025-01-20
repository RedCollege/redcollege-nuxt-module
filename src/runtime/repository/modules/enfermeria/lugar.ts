import type { $Fetch } from 'ofetch';
import type { ILugar, ILugarForm } from '~/src/runtime/models';

export default class LugarModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllLugaresByEstablecimiento(establecimientoId: number|string): Promise<ILugar[]> {
        return this.fetcher(`/enfermeria/lugar/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveLugar(data: ILugarForm): Promise<ILugar> {
        return this.fetcher('/enfermeria/lugar', {
            method: 'POST',
            body: data
        })
    }

    async deleteLugar(id: number): Promise<ILugar> {
        return this.fetcher(`/enfermeria/lugar/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}