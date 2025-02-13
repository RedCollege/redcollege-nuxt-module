import type { $Fetch } from 'ofetch';
import type { IGrupo, IUsuario } from '~/src/runtime/models';

export default class GrupoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerGruposByUsuario(periodo: number): Promise<IGrupo[]> {
        return this.fetcher(`comunicaciones/grupos/obtenerGruposByUsuario`, {
            method: 'GET',
            params: { periodo }
        });
    }

    async obtenerUsuarios(grupoId: number): Promise<IUsuario[]> {
        return this.fetcher(`comunicaciones/grupos/obtenerUsuarios/${grupoId}`, {
            method: 'GET'
        });
    }

}
