import type { $Fetch } from 'ofetch';
import type { IGrupo, IUsuario } from '~/src/runtime/models';

export default class GrupoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerGruposByUsuario(): Promise<IGrupo[]> {
        return this.fetcher(`comunicaciones/grupos/obtenerGruposByUsuario`, {
            method: 'GET'
        });
    }

    async obtenerUsuarios(grupoId: number): Promise<IUsuario[]> {
        return this.fetcher(`comunicaciones/grupos/obtenerUsuarios/${grupoId}`, {
            method: 'GET'
        });
    }

}
