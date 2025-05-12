import type { $Fetch } from 'ofetch';
import type { IArchivo } from '~/src/runtime/models/General/archivo';


export default class AuxiliarModule {
    constructor(private fetcher: $Fetch) { }

    async subirArchivo(file: File, folder: string): Promise<IArchivo> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        return this.fetcher(`general/auxiliar/upload?folder=${folder}`, {
            method: 'POST',
            body: formData
        });
    }

    async eliminarArchivo(url: string): Promise<{ success: boolean; message: string }> {
        return this.fetcher('general/auxiliar/delete', {
            method: 'DELETE',
            body: {
                url
            }
        });
    }
}
