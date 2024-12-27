import type { $Fetch } from 'ofetch';
import type { IUsuario, IUsuarioUpdate } from '~/src/runtime/models/Auth/usuario';


export default class UsuarioModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerColaboradorById(usuarioId: number): Promise<IUsuario> {
        return this.fetcher(`/auth/obtenerColaboradorById/${usuarioId}`, {
            method: 'GET'
        })
    }

    async actualizarUsuarioById(usuarioId: number, usuario: IUsuarioUpdate): Promise<IUsuario> {
        return this.fetcher(`auth/actualizarUsuarioById/${usuarioId}`, {
            method: 'PATCH',
            body: usuario
        });
    }

}
