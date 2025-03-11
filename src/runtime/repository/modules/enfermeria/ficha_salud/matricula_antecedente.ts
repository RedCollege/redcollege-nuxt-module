import type { $Fetch } from "ofetch";
import type { IMatriculaResponse } from "~/src/runtime/models/Matricula";

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

export default class MatriculaAntecedenteModule {
    constructor(private fetcher: $Fetch) {}

    async getByEstablecimiento(
        props?: GetAllProps
    ): Promise<IMatriculaResponse> {
        return this.fetcher(
            "enfermeria/ficha_salud/matricula_antecedente/getByEstablecimiento",
            {
                params: props,
                method: "GET",
            }
        );
    }
}
