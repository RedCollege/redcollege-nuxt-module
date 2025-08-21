import type { $Fetch } from 'ofetch';
import type { IMonitoreo, IOAporNivel } from '~/src/runtime/models/Planificacion/monitoreo';

interface AllProps {
    establecimientoId: number;
    periodo: number
    seccion: 'sostenedor' | 'cursos' | 'docentes' | 'general' | 'global'
    usuario?: number
    cursoId?: number;
    filtro?: string;
}

export default class PlanificacionEstadisticaModule {

    constructor(private fetcher: $Fetch) { }


    async getEstadisticas(props: AllProps): Promise<IMonitoreo> {

        return this.fetcher(`/planificacion/monitoreo/${props.establecimientoId}`, {
            method: 'GET',
            params: props
        })
    }

    async getOAporNivel(props: AllProps): Promise<IOAporNivel[]> {

        return this.fetcher(`/planificacion/estadisticas/oa_por_nivel?establecimiento=${props.establecimientoId}&periodo=${props.periodo}`, {
            method: 'GET',
        })
    }

}