import type { $Fetch } from 'ofetch';
import type { IMatriculaResponse } from '~/src/runtime/models/Matricula';

interface GetAllProps {
    trashed?: boolean;
    periodo?: string;
    curso?: string;
    estado?: string;
    condicion?: boolean;
    page?: number;
    buscar?: string;
    establecimiento: number;
}

export default class MatriculaModule {
    constructor(private fetcher: $Fetch) { }

    async getByEstablecimiento(props?: GetAllProps): Promise<IMatriculaResponse> {
        return this.fetcher('establecimiento/matriculas/getByEstablecimiento', {
            params: props,
            method: 'GET'
        });
    }
}
