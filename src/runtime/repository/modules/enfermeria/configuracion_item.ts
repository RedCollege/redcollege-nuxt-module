import type { $Fetch } from 'ofetch';
import type { ContextEnum, IConfiguracionItem, IConfiguracionItemForm } from '~/src/runtime/models';

interface Props {
    establecimientoId : string | number
    context: string | string[]
}

export default class ConfiguracionItemModule{
    constructor(private fetcher: $Fetch) { }
 
    async getAllConfiguracionItemByEstablecimiento({establecimientoId, context }: Props): Promise<IConfiguracionItem[]> {

        const params: Record<string, any> = {}

        if (Array.isArray(context)) {
            params.context = context.map(c => c)
        } else {
            params.context = context
        }

        return this.fetcher(`/enfermeria/configuracion-item/${establecimientoId}`, {
            method: 'GET',
            params,
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