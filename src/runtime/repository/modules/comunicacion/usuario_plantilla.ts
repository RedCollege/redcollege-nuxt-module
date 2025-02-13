import type { $Fetch } from 'ofetch';
import type { IUsuarioPlantilla, IUsuarioPlantillaForm } from '~/src/runtime/models/Comunicacion/usuario_plantilla';

export default class UsuarioPlantillaModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerAllPlantillasUsuario(): Promise<Array<IUsuarioPlantilla>> {
        return this.fetcher(`comunicaciones/usuarioPlantillas/obtenerAllPlantillasUsuario`, {
            method: 'GET'
        });
    }

    async crearPlantillaUsuario(usuarioPlantilla: IUsuarioPlantillaForm): Promise<IUsuarioPlantilla> {
        return this.fetcher(`comunicaciones/usuarioPlantillas/crearPlantillaUsuario`, {
            method: 'POST',
            body: usuarioPlantilla
        });
    }

    async actualizarPlantillaUsuario(plantillaId: number, usuarioPlantilla: IUsuarioPlantillaForm): Promise<IUsuarioPlantilla> {
        return this.fetcher(`comunicaciones/usuarioPlantillas/actualizarPlantillaUsuario/${plantillaId}`, {
            method: 'PATCH',
            body: usuarioPlantilla
        });
    }

    async eliminarPlantillaUsuario(usuarioPlantillaId: number): Promise<Array<IUsuarioPlantilla>> {
        return this.fetcher(`comunicaciones/eliminarPlantillaUsuario/${usuarioPlantillaId}`, {
            method: 'DELETE'
        });
    }
}
