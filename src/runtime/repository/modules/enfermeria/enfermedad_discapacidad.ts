import type { $Fetch } from 'ofetch';
import type { IEnfermedadDiscapacidad, IEnfermedadDiscapacidadForm } from '~/src/runtime/models';

export default class EnfermedadDiscapacidadModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllEnfermedadDiscapacidadByEstablecimiento(establecimientoId: number|string): Promise<IEnfermedadDiscapacidad[]> {
        return this.fetcher(`/enfermeria/enfermedad/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveEnfermedadDiscapacidad(data: IEnfermedadDiscapacidadForm): Promise<IEnfermedadDiscapacidad> {
        return this.fetcher('/enfermeria/enfermedad', {
            method: 'POST',
            body: data
        })
    }

    async deleteEnfermedadDiscapacidad(id: number): Promise<IEnfermedadDiscapacidad> {
        return this.fetcher(`/enfermeria/enfermedad/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}