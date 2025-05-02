import type { $Fetch } from "ofetch";
import type { IEstadisticaFilter, IEstadisticas } from "~/src/runtime/models";


export default class RegistroAtencionModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IEstadisticaFilter): Promise<IEstadisticas> {
        return this.fetcher("/enfermeria/estadistica/getEstadisticas", {
            params: props,
            method: "GET",
        });
    }
   
}
