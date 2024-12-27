import type { $Fetch } from 'ofetch';
import type { IUsuario } from '~/src/runtime/models/Auth/usuario';


export default class UsuarioModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerColaboradorById(usuarioId: number): Promise<IUsuario> {
        return this.fetcher(`/auth/obtenerColaboradorById/${usuarioId}`, {
            method: 'GET'
        })
    }

}
