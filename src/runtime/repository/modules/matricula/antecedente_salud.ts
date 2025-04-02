import type { $Fetch } from "ofetch";
import type { IMatriculaResponse } from "~/src/runtime/models";
import type {
    IAntecedenteSalud,
    IAntecedenteSaludForm,
} from "~/src/runtime/models/Matricula/antecedente_salud";

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

export default class AntecedenteSalud {
    constructor(private fetcher: $Fetch) {}

    async getByEstablecimiento(
        props?: GetAllProps
    ): Promise<IMatriculaResponse> {
        return this.fetcher(
            "establecimiento/matriculas/antecedente_salud/getByEstablecimiento",
            {
                params: props,
                method: "GET",
            }
        );
    }

    async actualizarAntecedenteSalud(
        id: number,
        data: IAntecedenteSaludForm
    ): Promise<IAntecedenteSalud> {
        return this.fetcher(
            `establecimiento/matriculas/antecedente_salud/actualizarAntecedenteSalud/${id}`,
            {
                method: "PATCH",
                body: data,
            }
        );
    }
}
