import type { $Fetch } from "ofetch";
import type {
    INotificacion,
    INotificacionesQueryParams,
    INotificacionesResponse,
} from "../../../models/Notificacion/notificacion";

export default class NotificacionModule {
    constructor(private fetcher: $Fetch) {}

    async obtenerNotificaciones(
        queryParams: INotificacionesQueryParams,
    ): Promise<INotificacionesResponse> {
        return this.fetcher(`/notificaciones`, {
            method: "GET",
            params: queryParams,
        });
    }

    async obtenerContadores(): Promise<{
        noLeidas: number;
        total: number;
    }> {
        return this.fetcher(`/notificaciones/contadores`, {
            method: "GET",
        });
    }

    async marcarLeida(id: number): Promise<INotificacion> {
        return this.fetcher(`/notificaciones/${id}/marcar_leida`, {
            method: "PATCH",
        });
    }

    async marcarTodasLeidas() {
        return this.fetcher(`/notificaciones/marcar_todas_leidas`, {
            method: "PATCH",
        });
    }

    async marcarMultiplesBorradas(
        notificacionIds: number[],
    ): Promise<{ cantidad: number }> {
        return this.fetcher(`/notificaciones/marcar_multiples_borradas`, {
            method: "PUT",
            body: {
                notificacionIds,
            },
        });
    }
}
