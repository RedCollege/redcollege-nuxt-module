import type { $Fetch } from 'ofetch';
import type { IMotivo, IMotivoForm } from '~/src/runtime/models';

export default class MotivoAtencionModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllMotivosByEstablecimiento(establecimientoId: number|string): Promise<IMotivo[]> {
        return this.fetcher(`/enfermeria/motivo_atencion/${establecimientoId}`, {
            method: 'GET'
        });
    }

   async saveMotivoAtencion(data: IMotivoForm): Promise<IMotivo> {
        return this.fetcher('/enfermeria/motivo_atencion', {
            method: 'POST',
            body: data
        })
    }

    async deleteMotivo(id: number): Promise<IMotivo> {
        return this.fetcher(`/enfermeria/motivo_atencion/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}