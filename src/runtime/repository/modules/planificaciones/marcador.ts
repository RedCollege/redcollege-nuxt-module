import type { $Fetch } from 'ofetch';
import type { IMarcador } from '../../../models/Planificacion/marcador';
import type { DateTime } from 'luxon';

interface IFormDataMarcador {
    id: number;
    fecha: string;
    color: string;
    icon: string;
    iconColor: string;
    nombre: string;
    descripcion: string;
    unidadId: number;
    deletedBy: number | null;
    deletedAt: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
}
export default class MarcadorModule {
    constructor(private fetcher: $Fetch) { }


    async obtenerMarcadorPorUnidad(unidadId: number): Promise<IMarcador> {
        return this.fetcher(`/marcadores/${unidadId}`, {
            method: "GET"
        })
    }

    async crearMarcador(unidadId: number, marcadorFormData: IFormDataMarcador): Promise<IMarcador> {
        return this.fetcher(`/marcadores/${unidadId}`, {
            method: "POST",
            body: marcadorFormData
        })
    }

    async actualizarMarcador(marcadorId: number, marcadorFormData: IFormDataMarcador): Promise<IMarcador> {
        return this.fetcher(`/marcadores/${marcadorId}`, {
            method: "PATCH",
            body: marcadorFormData
        })
    }
    async eliminarMarcador(marcadorId: number): Promise<IMarcador> {
        return this.fetcher(`/marcadores/${marcadorId}`, {
            method: "DELETE"
        })
    }
}