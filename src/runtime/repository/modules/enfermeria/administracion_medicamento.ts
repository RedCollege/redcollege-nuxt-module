import type { $Fetch } from "ofetch";
import type { 
    IAdministracionMedicamento, 
    IAdministracionMedicamentoAdjunto, 
    IAdministracionMedicamentoFilter, 
    IAdministracionMedicamentoForm, 
    IAdministracionMedicamentoResponse
} from "~/src/runtime/models";

export default class AdministracionMedicamentosModule {
    constructor(private fetcher: $Fetch) {}

    async getAll(props?: IAdministracionMedicamentoFilter): Promise<IAdministracionMedicamentoResponse> {
        return this.fetcher("/enfermeria/administracion_medicamentos", {
            params: props,
            method: "GET",
        });
    }

    async getById(
        administracionMedicamentoId: number
    ): Promise<IAdministracionMedicamento> {
        return this.fetcher(
            `/enfermeria/administracion_medicamentos/${administracionMedicamentoId}`,
            {
                method: "GET",
            }
        );
    }

    async saveAdministracionMedicamento(
        data: IAdministracionMedicamentoForm
    ): Promise<IAdministracionMedicamento> {
        return this.fetcher("/enfermeria/administracion_medicamentos", {
            method: "POST",
            body: data,
        });
    }

    async updateAdministracionMedicamento({
        data,
        administracionMedicamentoId,
    }: {
        data: IAdministracionMedicamentoForm;
        administracionMedicamentoId: number;
    }): Promise<IAdministracionMedicamento> {
        return this.fetcher(
            `/enfermeria/administracion_medicamentos/${administracionMedicamentoId}`,
            {
                method: "PATCH",
                body: data,
            }
        );
    }

    async deleteTemporalAdministracionMedicamento(
        administracionMedicamentoId: number
    ): Promise<IAdministracionMedicamento> {
        return this.fetcher(
            `/enfermeria/administracion_medicamentos/${administracionMedicamentoId}`,
            {
                method: "DELETE",
            }
        );
    }

    async restoreAdministracionMedicamento(
        administracionMedicamentoId: number
    ): Promise<IAdministracionMedicamento> {
        return this.fetcher(
            `/enfermeria/administracion_medicamentos/${administracionMedicamentoId}/restore`,
            {
                method: "PATCH",
            }
        );
    }

    async deleteAdministracionMedicamento(
        administracionMedicamentoId: number
    ): Promise<IAdministracionMedicamento> {
        return this.fetcher(
            `/enfermeria/administracion_medicamentos/${administracionMedicamentoId}/destroy`,
            {
                method: "DELETE",
            }
        );
    }

    async subirAdjunto(
        file: File,
        folder: string
    ): Promise<IAdministracionMedicamentoAdjunto> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        return this.fetcher(`/enfermeria/administracion_medicamentos/adjuntos/upload`, {
            method: "POST",
            body: formData,
        });
    }

    async eliminarAdjunto(
        id: number
    ): Promise<{ success: boolean; message: string }> {
        return this.fetcher(`/enfermeria/administracion_medicamentos/adjuntos/delete/${id}`, {
            method: "DELETE",
        });
    }
}