import type { $Fetch } from 'ofetch';
import type { IPermiso } from '~/src/runtime/models/Comunicacion';

export default class PermisoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerPermisos(establecimientoId: number): Promise<IPermiso> {
        return this.fetcher(`comunicaciones/permisos/obtenerPermisos/${establecimientoId}`, {
            method: 'GET'
        });
    }

    async actualizarPermisos(permiso: IPermiso): Promise<IPermiso> {
        return this.fetcher(`comunicaciones/permisos/actualizarPermisos`, {
            method: 'PATCH',
            body: permiso
        });
    }

}
