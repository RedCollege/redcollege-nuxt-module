import type { $Fetch } from 'ofetch';

interface AllProps {
    establecimientoId: number;
    periodo: number
    seccion: 'sostenedor' | 'cursos' | 'docentes' | 'general' | 'global'
    usuario?: number
    cursoId?: number;
}

export default class PlanificacionEstadisticaModule {

    constructor(private fetcher: $Fetch) { }


    async getEstadisticas(props: AllProps): Promise<any> {

        return this.fetcher(`/planificacion/monitoreo/${props.establecimientoId}`, {
            method: 'GET',
            params: props
        })
    }

}