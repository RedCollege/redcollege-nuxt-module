import type { $Fetch } from "ofetch";
import type { IViaTelefonica, IViaTelefonicaForm } from "~/src/runtime/models/Comunicacion/via_telefonica";

// Tipos para el método asociarRegistrosPivote
export type TipoRegistro = 'atencion' | 'accidente' | 'administracion_medicamento'
export type EntidadTipo = 'via_telefonica' | 'mensaje'

export interface IAsociarRegistrosPivoteRequest {
    entidadTipo: EntidadTipo
    entidadId: number
    tipoRegistro: TipoRegistro
    registroIds: number[]
}

export interface IAsociarRegistrosPivoteResponse {
    tipoRegistro: TipoRegistro
    registrosAsociados: number
}

export default class ViaTelefonicaModule {
    constructor(private fetcher: $Fetch) {}

    async store(data: IViaTelefonicaForm): Promise<IViaTelefonica> {
        return this.fetcher("/comunicacion/via_telefonica/crear", {
            method: "POST",
            body: data,
        });
    }
    
    async update(id: number, data: IViaTelefonicaForm): Promise<IViaTelefonica> {
        return this.fetcher(`/comunicacion/via_telefonica/actualizar/${id}`, {
            method: "PATCH",
            body: data,
        });
    }

    async delete(id: number): Promise<IViaTelefonica> {
        return this.fetcher(`/comunicacion/via_telefonica/eliminar/${id}`, {
            method: "DELETE",
        });
    }
    
    async asociarRegistrosPivote(data: IAsociarRegistrosPivoteRequest): Promise<IAsociarRegistrosPivoteResponse> {
        return this.fetcher("/comunicacion/via_telefonica/asociarRegistrosPivote", {
            method: "POST",
            body: data,
        });
    }
}