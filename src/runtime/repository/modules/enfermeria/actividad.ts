import type { $Fetch } from "ofetch";
import type {
    IActividad,
    IActividadForm,
    IActividadFilter as IActividadFilters,
    IActividadResponse,
} from "~/src/runtime/models/Enfermeria/actividad";

export default class ActividadModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IActividadFilters): Promise<IActividadResponse> {
        return this.fetcher("/enfermeria/actividad", {
            params: props,
            method: "GET",
        });
    }

    async getById(actividadId: number): Promise<IActividad> {
        return this.fetcher(`/enfermeria/actividad/${actividadId}`, {
            method: "GET",
        });
    }

    async saveActividad(data: IActividadForm): Promise<IActividad> {
        return this.fetcher("/enfermeria/actividad", {
            method: "POST",
            body: data,
        });
    }

    async updateActividad({
        data,
        actividadId,
    }: {
        data: IActividadForm;
        actividadId: number;
    }): Promise<IActividad> {
        return this.fetcher(`/enfermeria/actividad/${actividadId}`, {
            method: "PATCH",
            body: data,
        });
    }

    async deleteActividad(actividadId: number): Promise<IActividad> {
        return this.fetcher(`/enfermeria/actividad/${actividadId}`, {
            method: "DELETE",
        });
    }
}
