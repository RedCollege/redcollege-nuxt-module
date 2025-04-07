import type { $Fetch } from "ofetch";
import type { IRegistroAtencionAdjunto } from "~/src/runtime/models/Enfermeria/adjunto";
import type {
    IRegistroAtencion,
    IRegistroAtencionFilters,
    IRegistroAtencionForm,
    IRegistroAtencionResponse,
} from "~/src/runtime/models/Enfermeria/registro_atencion";

export default class RegistroAtencionModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IRegistroAtencionFilters): Promise<IRegistroAtencionResponse> {
        return this.fetcher("/enfermeria/registro-atencion", {
            params: props,
            method: "GET",
        });
    }
    async getById(
        registroAtencionId: number | string
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro-atencion/${registroAtencionId}`,
            {
                method: "GET",
            }
        );
    }

    async saveRegistroAtencion(
        data: IRegistroAtencionForm
    ): Promise<IRegistroAtencion> {
        return this.fetcher("/enfermeria/registro-atencion", {
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
            `/enfermeria/registro-atencion/${registroAtencionId}`,
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
            `/enfermeria/registro-atencion/${registroAtencionId}`,
            {
                method: "DELETE",
            }
        );
    }

    async restoreRegistroAtencion(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro-atencion/${registroAtencionId}/restore`,
            {
                method: "PATCH",
            }
        );
    }

    async deleteRegistroAtencion(
        registroAtencionId: number
    ): Promise<IRegistroAtencion> {
        return this.fetcher(
            `/enfermeria/registro-atencion/${registroAtencionId}/destroy`,
            {
                method: "DELETE",
            }
        );
    }

    async subirAdjunto(
        file: File,
        folder: string
    ): Promise<IRegistroAtencionAdjunto> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        return this.fetcher(`/enfermeria/registro-atencion/adjuntos/upload`, {
            method: "POST",
            body: formData,
        });
    }

    async eliminarAdjunto(
        url: string
    ): Promise<{ success: boolean; message: string }> {
        return this.fetcher(`/enfermeria/registro-atencion/adjuntos/delete`, {
            method: "DELETE",
            body: {
                url,
            },
        });
    }
}
