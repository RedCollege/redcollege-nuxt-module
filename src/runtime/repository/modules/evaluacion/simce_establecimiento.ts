import type { $Fetch } from 'ofetch';
import type {
    IConfiguracionEvaluacionesResponse,
    IActualizarConfiguracionRequest,
    IAlertasResponse
} from '~/src/runtime/models/Evaluacion';

export default class SimceEstablecimientoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerConfiguracionEstablecimiento(establecimientoId: number, periodo: number): Promise<IConfiguracionEvaluacionesResponse> {
        return this.fetcher(`/evaluacion/simce_establecimiento/configuracion/${establecimientoId}/${periodo}`, {
            method: 'GET'
        })
    }

    async actualizarEvaluacionIndividual(
        establecimientoId: number,
        periodo: number,
        gradoId: number,
        grupoId: number,
        ensayo: number,
        enabled: boolean,
        version?: string
    ): Promise<{ message: string; establecimientoId: number; periodo: number; gradoId: number; grupoId: number; ensayo: number; enabled: boolean; version: string }> {
        return this.fetcher(`/evaluacion/simce_establecimiento/configuracion/${establecimientoId}/${periodo}/${gradoId}/${grupoId}/${ensayo}`, {
            method: 'PATCH',
            body: { enabled, version }
        })
    }

    async actualizarConfiguracionEstablecimiento(establecimientoId: number, periodo: number, configuraciones: IActualizarConfiguracionRequest): Promise<{ message: string; establecimientoId: number; periodo: number }> {
        return this.fetcher(`/evaluacion/simce_establecimiento/configuracion/${establecimientoId}/${periodo}`, {
            method: 'PUT',
            body: configuraciones
        })
    }

    async obtenerAlertasSeguridad(periodo: number): Promise<IAlertasResponse> {
        return this.fetcher(`/evaluacion/simce_establecimiento/alertas/${periodo}`, {
            method: 'GET'
        })
    }
}
