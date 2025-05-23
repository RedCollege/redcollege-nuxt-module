import type { $Fetch } from "ofetch";
import type {
    IEnfermedadDiscapacidad,
    IEnfermedadDiscapacidadForm,
} from "~/src/runtime/models";

interface FilterParams {
    tipo?: string;
}

export default class EnfermedadDiscapacidadModule {
    constructor(private fetcher: $Fetch) {}

    async getAllEnfermedadDiscapacidadByEstablecimiento(
        establecimientoId: number,
        filters?: FilterParams
    ): Promise<IEnfermedadDiscapacidad[]> {
        return this.fetcher(`/enfermeria/enfermedad/${establecimientoId}`, {
            method: "GET",
            params: filters,
        });
    }

    async saveEnfermedadDiscapacidad(
        data: IEnfermedadDiscapacidadForm | IEnfermedadDiscapacidadForm[]
    ): Promise<IEnfermedadDiscapacidad | IEnfermedadDiscapacidad[]> {
        const payload = Array.isArray(data) ? data : [data];

        return this.fetcher("/enfermeria/enfermedad", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }

    async updateEnfermedadDiscapacidad(
        data: IEnfermedadDiscapacidad | IEnfermedadDiscapacidad[]
    ): Promise<IEnfermedadDiscapacidad | IEnfermedadDiscapacidad[]> {
        const payload = Array.isArray(data) ? data : [data];
        return this.fetcher("/enfermeria/enfermedad", {
            method: "PUT",
            body: JSON.stringify(payload),
        });
    }

    async deleteEnfermedadDiscapacidad(
        id: number | number[]
    ): Promise<IEnfermedadDiscapacidad | IEnfermedadDiscapacidad[]> {
        if (Array.isArray(id)) {
            return this.fetcher("/enfermeria/enfermedad/delete", {
                method: "DELETE",
                body: JSON.stringify({ ids: id }),
            });
        }

        return this.fetcher(`/enfermeria/enfermedad/${id}/delete`, {
            method: "DELETE",
        });
    }

    async destroyEnfermedadDiscapacidad(id: number ): Promise<void> {
        return this.fetcher(`/enfermeria/enfermedad/${id}/destroy`, {
            method: "DELETE",
        });
    }
    
    async restoreEnfermedadDiscapacidad(id: number ): Promise<IEnfermedadDiscapacidad> {
        return this.fetcher(`/enfermeria/enfermedad/${id}/restore`, {
            method: "PATCH",
        });
    }

}
