import type { $Fetch } from 'ofetch';
import type { IMatriculaResponse, IMatriculaUpdate } from '~/src/runtime/models/Matricula';

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

    async actualizarMatricula(matricula: IMatriculaUpdate): Promise<IMatriculaResponse> {
        return this.fetcher('establecimiento/matriculas/actualizarMatricula', {
            method: 'PATCH',
            body: matricula
        });
    }

    async destroyMatricula(matriculaId: number): Promise<IMatriculaResponse> {
        return this.fetcher(`establecimiento/matriculas/destroyMatricula/${matriculaId}`, {
            method: 'DELETE'
        });
    }
}
