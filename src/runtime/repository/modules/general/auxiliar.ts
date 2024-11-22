import type { $Fetch } from 'ofetch';

interface ArchivoResponse {
    message: string;
    archivo: {
        nombre: string;
        url: string;
        peso: number;
    }
}

export default class AuxiliarModule {
    constructor(private fetcher: $Fetch) { }

    async subirArchivo(file: File, folder: string): Promise<ArchivoResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        return this.fetcher('/auxiliar/upload', {
            method: 'POST',
            body: formData
        });
    }

    async eliminarArchivo(url: string): Promise<{ success: boolean; message: string }> {
        return this.fetcher('/auxiliar/delete', {
            method: 'DELETE',
            body: {
                url
            }
        });
    }
}
