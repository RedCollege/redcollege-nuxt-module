import type { $Fetch } from 'ofetch';
import type { ITipoActividad, ITipoActividadForm } from '~/src/runtime/models';

export default class TipoActividadModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllTipoActividadByEstablecimiento(establecimientoId: number|string): Promise<ITipoActividad[]> {
        return this.fetcher(`/enfermeria/tipo-actividad/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveTipoActividad(data: ITipoActividadForm): Promise<ITipoActividad> {
        return this.fetcher('/enfermeria/tipo-actividad', {
            method: 'POST',
            body: data
        })
    }

    async deleteTipoActividad(id: number): Promise<ITipoActividad> {
        return this.fetcher(`/enfermeria/tipo-actividad/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}