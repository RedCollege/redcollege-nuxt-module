import type { $Fetch } from 'ofetch';
import type { IInformeCursoEvalua, IInformeGlobalEvalua } from '~/src/runtime/models/Evaluacion';


export default class EvaluacionCursoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerInformeCursoByEstablecimientoId(establecimientoId: number, periodo: number): Promise<IInformeCursoEvalua> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeCursoByEstablecimientoId/${establecimientoId}?periodo=${periodo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeGlobalByEstablecimientoId(establecimientoId: number, periodo: number): Promise<IInformeGlobalEvalua> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeGlobalByEstablecimientoId/${establecimientoId}?periodo=${periodo}`, {
            method: 'GET'
        })
    }
}
