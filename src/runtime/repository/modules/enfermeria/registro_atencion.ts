import type { $Fetch } from "ofetch";
import type { IArchivo } from "~/src/runtime/models";
import type {
    IRegistroAtencion,
    IRegistroAtencionDescargable,
    IRegistroAtencionFilters,
    IRegistroAtencionForm,
    IRegistroAtencionResponse,
} from "~/src/runtime/models/Enfermeria/registro_atencion";

export default class RegistroAtencionModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IRegistroAtencionFilters): Promise<IRegistroAtencionResponse> {
        return this.fetcher("/enfermeria/registro_atencion", {
            params: props,
            method: "GET",
        });
    }

    async getById(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro_atencion/${registroAtencionId}`,
            {
                method: "GET",
            }
        );
    }

    async saveRegistroAtencion(
        data: IRegistroAtencionForm
    ): Promise<IRegistroAtencion> {
        return this.fetcher("/enfermeria/registro_atencion", {
            method: "POST",
            body: data,
        });
    }

    async updateRegistroAtencion({
        data,
        registroAtencionId,
    }: {
        data: IRegistroAtencionForm;
        registroAtencionId: number;
    }): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro_atencion/${registroAtencionId}`,
            {
                method: "PATCH",
                body: data,
            }
        );
    }

    async deleteTemporalRegistroAtencion(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro_atencion/${registroAtencionId}`,
            {
                method: "DELETE",
            }
        );
    }

    async restoreRegistroAtencion(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro_atencion/${registroAtencionId}/restore`,
            {
                method: "PATCH",
            }
        );
    }

    async deleteRegistroAtencion(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro_atencion/${registroAtencionId}/destroy`,
            {
                method: "DELETE",
            }
        );
    }

    async asociarAdjunto(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/enfermeria/registro_atencion/${id}/archivos`, {
            method: 'POST',
            body: {
                archivoId
            }
        });
    }
    
    async softDeleteAdjunto(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/enfermeria/registro_atencion/${id}/archivos/soft`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        });
    }

    async destroyAdjunto(id: number, archivoId: number): Promise<IArchivo> {
        return this.fetcher(`/enfermeria/registro_atencion/${id}/archivos`, {
            method: 'DELETE',
            body: {
                archivoId
            }
        });
    }

    async getDescargable(props?: IRegistroAtencionFilters): Promise<IRegistroAtencionDescargable> {
        return this.fetcher("/enfermeria/registro_atencion/descargable", {
            params: props,
            method: "GET",
        });
    }
}
