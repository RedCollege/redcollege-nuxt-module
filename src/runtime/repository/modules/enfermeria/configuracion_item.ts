import type { $Fetch } from 'ofetch';
import type { IConfiguracionItem, IConfiguracionItemForm } from '~/src/runtime/models';

interface Props {
    establecimientoId : string | number
    context: string 
}

export default class ConfiguracionItemModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllConfiguracionItemByEstablecimiento({establecimientoId, context }: Props): Promise<IConfiguracionItem[]> {
        return this.fetcher(`/enfermeria/configuracion-item/${establecimientoId}`, {
            method: 'GET',
            params: { context },
        });
    }

   async saveConfiguracionItem(data: IConfiguracionItemForm): Promise<IConfiguracionItem> {
        return this.fetcher('/enfermeria/configuracion-item', {
            method: 'POST',
            body: data
        })
    }

    async deleteConfiguracionItem(id: number): Promise<IConfiguracionItem> {
        return this.fetcher(`/enfermeria/configuracion-item/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}