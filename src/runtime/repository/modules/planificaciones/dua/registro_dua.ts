import type { $Fetch } from 'ofetch';
import type { IRegistroDua } from '../../../../models/Planificacion/dua/registro_dua';
import type { IPrincipio } from '../../../../models/Planificacion/dua/principio';


export default class RegistroDuaModule {
    constructor(private fetcher: $Fetch) { }

    async getById(registroId: number): Promise<IRegistroDua> {
        return this.fetcher(`/registroDua/getById/${registroId}`, {
            method: 'GET'
        })
    }

    async update(registroId: number, usuariosIds: number[], sugerenciasIds: number[], contenidoId: number): Promise<IRegistroDua> {
        return this.fetcher(`/registroDua/update/${registroId}`, {
            method: 'PATCH',
            body: {
                contenidoId: contenidoId,
                usuariosIds: usuariosIds,
                sugerenciasIds: sugerenciasIds,

            }
        })
    }

    async create(usuariosIds: number[], sugerenciasIds: number, contenidoId: number): Promise<IRegistroDua> {
        return this.fetcher(`/registroDua/create`, {
            method: "POST",
            body: {
                contenidoId: contenidoId,
                usuariosIds: usuariosIds,
                sugerenciasIds: sugerenciasIds,
            }
        })
    }

    async getByContenidoId(contenidoId: number): Promise<Array<IRegistroDua>> {
        return this.fetcher(`/registroDua/getByContenidoId/${contenidoId}`, {
            method: "GET"
        })
    }

    async delete(registroId: number): Promise<IRegistroDua> {
        return this.fetcher(`/registroDua/delete/${registroId}`, {
            method: 'DELETE'
        })
    }

    async destroy(registroId: number): Promise<void> {
        return this.fetcher(`/registroDua/destroy/${registroId}`, {
            method: 'DELETE'
        })
    }

    async getPrincipios(): Promise<IPrincipio[]> {
        return this.fetcher('/principio/', {
            method: 'GET'
        })
    }
}