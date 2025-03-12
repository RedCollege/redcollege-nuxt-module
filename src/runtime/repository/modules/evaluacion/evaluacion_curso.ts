import type { $Fetch } from 'ofetch';
import type { IInformeCursoEvalua } from '~/src/runtime/models/Evaluacion';


export default class EvaluacionCursoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerInformeCursoByEstablecimientoId(establecimientoId: number, periodo: number): Promise<IInformeCursoEvalua> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeCursoByEstablecimientoId/${establecimientoId}?periodo=${periodo}`, {
            method: 'GET'
        })
    }
}
