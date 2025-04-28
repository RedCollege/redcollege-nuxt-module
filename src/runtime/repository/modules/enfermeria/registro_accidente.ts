import type { $Fetch } from "ofetch";
import type { IRegistroAccidente, IRegistroAccidenteFilter, IRegistroAccidenteForm } from "~/src/runtime/models";

export default class RegistroAccidenteModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IRegistroAccidenteFilter): Promise<IRegistroAccidente> {
            return this.fetcher("/enfermeria/registro_accidente", {
                params: props,
                method: "GET",
            });
        }
        async getById(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro_accidente/${registroAccidenteId}`,
                {
                    method: "GET",
                }
            );
        }
    
        async saveRegistroAccidente(
            data: IRegistroAccidenteForm
        ): Promise<IRegistroAccidente> {
            return this.fetcher("/enfermeria/registro_accidente", {
                method: "POST",
                body: data,
            });
        }
    
        async updateRegistroAccidente({
            data,
            registroAccidenteId,
        }: {
            data: IRegistroAccidenteForm;
            registroAccidenteId: number;
        }): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro_accidente/${registroAccidenteId}`,
                {
                    method: "PATCH",
                    body: data,
                }
            );
        }
    
        async deleteTemporalRegistroAccidente(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro_accidente/${registroAccidenteId}`,
                {
                    method: "DELETE",
                }
            );
        }
    
        async restoreRegistroAccidente(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro_accidente/${registroAccidenteId}/restore`,
                {
                    method: "PATCH",
                }
            );
        }
    
        async deleteRegistroAccidente(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro_accidente/${registroAccidenteId}/destroy`,
                {
                    method: "DELETE",
                }
            );
        }

        async getDescargableIndividual(registroAccidenteId: number): Promise<any> {
            return this.fetcher(
                `/enfermeria/registro_accidente/descargable/${registroAccidenteId}`,
                {
                    method: "GET"
                }
            )
        }

}