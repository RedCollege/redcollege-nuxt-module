import type { $Fetch } from 'ofetch';
import type { IGrupo, IUsuario, IGrupoForm } from '~/src/runtime/models';

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

    async crearGrupo(grupo: IGrupoForm): Promise<IGrupo> {
        return this.fetcher(`comunicaciones/grupos/crearGrupo`, {
            method: 'POST',
            body: grupo
        });
    }

    async actualizarGrupo(grupoId: number, usuarios: number[]): Promise<IGrupo> {
        return this.fetcher(`comunicaciones/grupos/actualizarGrupo/${grupoId}`, {
            method: 'PATCH',
            body: {
                usuarios
            }
        });
    }

    async eliminarGrupo(grupoId: number): Promise<IGrupo> {
        return this.fetcher(`comunicaciones/grupos/eliminarGrupo/${grupoId}`, {
            method: 'DELETE'
        });
    }

}
