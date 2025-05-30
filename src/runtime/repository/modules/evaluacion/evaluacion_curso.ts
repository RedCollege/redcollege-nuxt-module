import type { $Fetch } from 'ofetch';
import type { IInformeCursoEvalua, IInformeDetallado, IInformeGlobalEvalua, IInformeEstablecimientoEvalua, IEvaluacionCurso, IEstudianteEvaluacion } from '~/src/runtime/models/Evaluacion';


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

    async obtenerInformeEstablecimientosComparativo(periodo: number, establecimientoIds: number[], sigeId: number, grupoAsignaturaId: number): Promise<IInformeEstablecimientoEvalua> {
        const idsParam = establecimientoIds.join(',');
        return this.fetcher(`/evaluacion_curso/obtenerInformeResumidoMultiEstablecimiento?periodo=${periodo}&establecimientoIds=${idsParam}&sigeId=${sigeId}&grupoAsignaturaId=${grupoAsignaturaId}`, {
            method: 'GET'
        })
    }

    async obtenerInformeDetalladoByEvaluacionCursoId(evaluacionCursoId: number): Promise<IInformeDetallado> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeDetalladoByEvaluacionCursoId/${evaluacionCursoId}`, {
            method: 'GET'
        })
    }

    async obtenerEvaluacionesSimceByMultiEstablecimientoId(establecimientoIds: number[], periodo: number): Promise<IEvaluacionCurso[]> {
        const idsParam = establecimientoIds.join(',');
        return this.fetcher(`/evaluacion_curso/obtenerEvaluacionesSimceByMultiEstablecimientoId?&establecimientoIds=${idsParam}&periodo=${periodo}`, {
            method: 'GET'
        })
    }

    async obtenerEvaluacionesSimceByEstablecimientoId(establecimientoId: number, periodo: number): Promise<IEvaluacionCurso[]> {
        return this.fetcher(`/evaluacion_curso/obtenerEvaluacionesSimceByEstablecimientoId/${establecimientoId}?periodo=${periodo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeEvaluacionesSimceByCursoId(cursoId: number, grupoAsignaturaId: number): Promise<IEstudianteEvaluacion[]> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeEvaluacionesSimceByCursoId/${cursoId}?grupoAsignaturaId=${grupoAsignaturaId}`, {
            method: 'GET'
        })
    }
}
