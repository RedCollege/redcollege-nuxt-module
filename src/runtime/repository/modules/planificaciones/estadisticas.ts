import type { $Fetch } from 'ofetch';
import type { IMonitoreoCurso, IMonitoreoDocente } from '~/src/runtime/models/Planificacion/monitoreo';

interface AllProps {
    establecimientoId: number;
    periodo: number
    seccion: 'sostenedor' | 'cursos' | 'docentes' | 'general' | 'global'
    usuario?: number
    cursoId?: number;
}

export default class PlanificacionEstadisticaModule {

    constructor(private fetcher: $Fetch) { }


    async getEstadisticas(props: AllProps): Promise<IMonitoreoCurso | IMonitoreoDocente> {

        return this.fetcher(`/planificacion/monitoreo/${props.establecimientoId}`, {
            method: 'GET',
            params: props
        })
    }

}