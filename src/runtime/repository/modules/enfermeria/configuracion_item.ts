import type { $Fetch } from 'ofetch';
import type { IConfiguracionItem, IConfiguracionItemForm, IConfiguracionItemGrouped } from '~/src/runtime/models';

interface Props {
    establecimientoId : number
    context: string | string[]
}

export default class ConfiguracionItemModule{
    constructor(private fetcher: $Fetch) {}
 
    async getAllConfiguracionItemByEstablecimiento({establecimientoId, context }: Props): Promise<IConfiguracionItemGrouped> {

        const params: Record<string, any> = {}

        if (Array.isArray(context)) {
            params.context = context.map(c => c)
        } else {
            params.context = context
        }

        return this.fetcher(`/enfermeria/configuracion_item/${establecimientoId}`, {
            method: 'GET',
            params,
        });
    }

   async saveConfiguracionItem(data: IConfiguracionItemForm): Promise<IConfiguracionItem> {
        return this.fetcher('/enfermeria/configuracion_item', {
            method: 'POST',
            body: data
        })
    }

    async deleteConfiguracionItem(id: number): Promise<IConfiguracionItem> {
        return this.fetcher(`/enfermeria/configuracion_item/${id}`, {
            method: 'DELETE'
        })
    }

    async restoreConfiguracionItem(id: number): Promise<IConfiguracionItem> {
        return this.fetcher(`/enfermeria/configuracion_item/${id}/restore`, {
            method: 'PATCH'
        })
    }

    async destroyConfiguracionItem(id: number): Promise<IConfiguracionItem> {
        return this.fetcher(`/enfermeria/configuracion_item/${id}/destroy`, {
            method: 'DELETE'
        })
    }
}