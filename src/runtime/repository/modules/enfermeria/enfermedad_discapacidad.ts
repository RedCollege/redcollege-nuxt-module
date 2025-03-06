import type { $Fetch } from 'ofetch';
import type { IEnfermedadDiscapacidad, IEnfermedadDiscapacidadForm } from '~/src/runtime/models';

export default class EnfermedadDiscapacidadModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllLugaresByEstablecimiento(establecimientoId: number|string): Promise<IEnfermedadDiscapacidad[]> {
        return this.fetcher(`/enfermeria/enfermedad/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveLugar(data: IEnfermedadDiscapacidadForm): Promise<IEnfermedadDiscapacidad> {
        return this.fetcher('/enfermeria/enfermedad', {
            method: 'POST',
            body: data
        })
    }

    async deleteLugar(id: number): Promise<IEnfermedadDiscapacidad> {
        return this.fetcher(`/enfermeria/enfermedad/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}