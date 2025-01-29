import type { $Fetch } from "ofetch";
import type { IAdjunto } from "~/src/runtime/models";

export default class AdjuntoModule {
    constructor(private fetcher: $Fetch) {}

    async subirAdjunto(file: File, folder: string): Promise<IAdjunto> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        return this.fetcher(`comunicacion/adjuntos/uploadAdjunto`, {
            method: "POST",
            body: formData,
        });
    }

    async eliminarAdjunto(
        url: string
    ): Promise<{ success: boolean; message: string }> {
        return this.fetcher(`comunicacion/adjuntos/deleteAdjunto`, {
            method: "DELETE",
            body: {
                url,
            },
        });
    }
}
