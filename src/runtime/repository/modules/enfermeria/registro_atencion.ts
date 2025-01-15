import type { $Fetch } from 'ofetch';
import type { IRegistroAtencion, IRegistroAtencionForm, IRegistroAtencionResponse } from '~/src/runtime/models/Enfermeria/registro_atencion';

interface GetAllProps {
    trashed?: boolean;
    page?: number;
    periodo?: string | number;
    establecimiento?: number | string;
    rangoFecha?: string
    paciente?: number | string;
    curso?: string | number;
    motivo?: string;
    origen?: string;
    destino?: string;
    estado?: boolean;
}

export default class RegistroAtencionModule{
    constructor(private fetcher: $Fetch) { }

    async getAll(props?: GetAllProps): Promise<IRegistroAtencionResponse> {
        return this.fetcher('/enfermeria/registro_atencion', {
            params: props,
            method: 'GET'
        });
    }
    async getById(registroAtencionId: number|string): Promise<IRegistroAtencion> {
        return this.fetcher(`/enfermeria/registro_atencion/${registroAtencionId}`, {
            method: 'GET'
        });
    }

   async saveRegistroAtencion(data: IRegistroAtencionForm): Promise<IRegistroAtencion> {
        return this.fetcher('/enfermeria/registro_atencion', {
            method: 'POST',
            body: data
        })
    }

    async updateRegistroAtencion({ data, registroAtencionId }: { data: IRegistroAtencionForm, registroAtencionId: number }): Promise<IRegistroAtencion> {
        return this.fetcher(`/enfermeria/registro_atencion/${registroAtencionId}`, {
            method: 'PATCH',
            body: data
        })
    }

    async deleteTemporalRegistroAtencion(registroAtencionId: number): Promise<IRegistroAtencion> {
        return this.fetcher(`/enfermeria/registro_atencion/${registroAtencionId}`, {
            method: "DELETE"
        })
    }

    async restoreRegistroAtencion(registroAtencionId: number): Promise<IRegistroAtencion> {
        return this.fetcher(`/enfermeria/registro_atencion/${registroAtencionId}/restore`, {
            method: "PATCH"
        })
    }

    async deletePlanificacion(registroAtencionId: number): Promise<IRegistroAtencion> {
        return this.fetcher(`/enfermeria/registro_atencion/${registroAtencionId}/destroy`, {
            method: 'DELETE'
        })
    }
}