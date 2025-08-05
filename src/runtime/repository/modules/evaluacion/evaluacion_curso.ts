import type { $Fetch } from 'ofetch';
import type { IInformeCursoEvalua, IInformeDetallado, IInformeGlobalEvalua, IInformeEstablecimientoEvalua, IEvaluacionCurso, IEstudianteEvaluacion, ICursoInforme, ICursoInformeEstudianteItemEntrada } from '~/src/runtime/models/Evaluacion';


export default class EvaluacionCursoModule {
    constructor(private fetcher: $Fetch) { }

    async obtenerInformeCursoByEstablecimientoId(establecimientoId: number, periodo: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IInformeCursoEvalua> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeCursoByEstablecimientoId/${establecimientoId}?periodo=${periodo}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeGlobalByEstablecimientoId(establecimientoId: number, periodo: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IInformeGlobalEvalua> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeGlobalByEstablecimientoId/${establecimientoId}?periodo=${periodo}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeEstablecimientosComparativo(periodo: number, establecimientoIds: number[], sigeId: number, grupoAsignaturaId: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IInformeEstablecimientoEvalua> {
        const idsParam = establecimientoIds.join(',');
        return this.fetcher(`/evaluacion_curso/obtenerInformeResumidoMultiEstablecimiento?periodo=${periodo}&establecimientoIds=${idsParam}&sigeId=${sigeId}&grupoAsignaturaId=${grupoAsignaturaId}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeDetalladoByEvaluacionCursoId(evaluacionCursoId: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IInformeDetallado> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeDetalladoByEvaluacionCursoId/${evaluacionCursoId}?tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerEvaluacionesSimceByMultiEstablecimientoId(establecimientoIds: number[], periodo: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IEvaluacionCurso[]> {
        const idsParam = establecimientoIds.join(',');
        return this.fetcher(`/evaluacion_curso/obtenerEvaluacionesSimceByMultiEstablecimientoId?&establecimientoIds=${idsParam}&periodo=${periodo}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerEvaluacionesSimceByEstablecimientoId(establecimientoId: number, periodo: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<IEvaluacionCurso[]> {
        return this.fetcher(`/evaluacion_curso/obtenerEvaluacionesSimceByEstablecimientoId/${establecimientoId}?periodo=${periodo}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeEvaluacionesSimceByCursoId(cursoId: number, grupoAsignaturaId: number, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<ICursoInforme> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeEvaluacionesSimceByCursoId/${cursoId}?grupoAsignaturaId=${grupoAsignaturaId}&tipo=${tipo}`, {
            method: 'GET'
        })
    }

    async obtenerInformeEstudiantesEntradaByCursoId(cursoId: number, grupoAsignaturaId: number, nombreItem : string, tipo: 'SIMCE' | 'PAES' = 'SIMCE'): Promise<ICursoInformeEstudianteItemEntrada[]> {
        return this.fetcher(`/evaluacion_curso/obtenerInformeEstudiantesEntradaByCursoId/${cursoId}?grupoAsignaturaId=${grupoAsignaturaId}&nombreItem=${nombreItem}&tipo=${tipo}`, {
            method: 'GET'
        })
    }
}
