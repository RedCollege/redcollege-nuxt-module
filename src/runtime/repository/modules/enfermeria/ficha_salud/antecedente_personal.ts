import type { $Fetch } from "ofetch";
import type {
    IAntecedentePersonal,
    IMatriculaResponse,
    IMatriculaUpdate,
} from "~/src/runtime/models/Matricula";

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

export default class AntecedentePersonal {
    constructor(private fetcher: $Fetch) {}

    async getByEstablecimiento(
        props?: GetAllProps
    ): Promise<IMatriculaResponse> {
        return this.fetcher(
            "enfermeria/ficha_salud/antecedente_personal/getByEstablecimiento",
            {
                params: props,
                method: "GET",
            }
        );
    }

    async getAntecedentesByMatriculaId(
        matriculaId: number
    ): Promise<IAntecedentePersonal> {
        return this.fetcher(
            `enfermeria/ficha_salud/antecedente_personal/getAntecedentesByMatriculaId${matriculaId}`
        );
    }
}
