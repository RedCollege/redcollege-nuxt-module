import type { $Fetch } from "ofetch";
import type { IRegistroAccidente, IRegistroAccidenteDescargableIndividual, IRegistroAccidenteFilter, IRegistroAccidenteForm } from "~/src/runtime/models";

export default class RegistroAccidenteModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IRegistroAccidenteFilter): Promise<IRegistroAccidente> {
            return this.fetcher("/enfermeria/registro-accidente", {
                params: props,
                method: "GET",
            });
        }
        async getById(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro-accidente/${registroAccidenteId}`,
                {
                    method: "GET",
                }
            );
        }
    
        async saveRegistroAccidente(
            data: IRegistroAccidenteForm
        ): Promise<IRegistroAccidente> {
            return this.fetcher("/enfermeria/registro-accidente", {
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
                `/enfermeria/registro-accidente/${registroAccidenteId}`,
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
                `/enfermeria/registro-accidente/${registroAccidenteId}`,
                {
                    method: "DELETE",
                }
            );
        }
    
        async restoreRegistroAccidente(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro-accidente/${registroAccidenteId}/restore`,
                {
                    method: "PATCH",
                }
            );
        }
    
        async deleteRegistroAccidente(
            registroAccidenteId: number
        ): Promise<IRegistroAccidente> {
            return this.fetcher(
                `/enfermeria/registro-accidente/${registroAccidenteId}/destroy`,
                {
                    method: "DELETE",
                }
            );
        }

        async getDescargable(props?: IRegistroAccidenteFilter): Promise<IRegistroAccidente[]> {
            return this.fetcher("/enfermeria/registro-accidente/descargable", {
                params: props,
                method: "GET",
            });
        }

        async getDescargableIndividual(registroAccidenteId: number): Promise<IRegistroAccidenteDescargableIndividual> {
            return this.fetcher(
                `/enfermeria/registro-accidente/descargable/${registroAccidenteId}`,
                {
                    method: "GET"
                }
            )
        }

}