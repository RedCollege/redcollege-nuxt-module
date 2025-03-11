import type { $Fetch } from 'ofetch';
import type { ICursoEvalua } from '~/src/runtime/models/Evaluacion';


export default class EvaluacionCursoModule {
    constructor(private fetcher: $Fetch) { }

    async getAsignaturaCurricularSige(establecimientoId: number, periodo: number): Promise<Array<ICursoEvalua>> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeCursoByEstablecimientoId/${establecimientoId}?periodo=${periodo}`, {
            method: 'GET'
        })
    }
}
