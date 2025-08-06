/**
 * Interfaces para el informe detallado de evaluación
 */

import type { DateTime } from "luxon";
import type { ICurso, IEstablecimiento } from "../../Establecimiento";

export interface IAntecedentesEvaluacion {
    estudiantesDelCurso: number;
    estudiantesEvaluados: number;
    puntajeTotal: number;
    nivelDeExigencia: string;
    notaMinima: string;
    cantidadDePreguntas: number;
}

export interface IAntecedentesResultados {
    puntajePromedioDelCurso: number;
    porcentajeLogroPromedioDelCurso: string;
    notaPromedioDelCurso: number;
    notaMinimaObtenida: number;
    notaMaximaObtenida: number;
    puntajePromedioPAES: number;
}

export interface INivelLogro {
    nivel: string;
    tramos: string;
    cantidadEstudiantes: number;
    porcentajeEstudiantes: string;
}


export interface IEstudianteDetalle {
    numero: number;
    estudiante: string;
    puntaje: string;
    porcentajeExigencia: string;
    porcentajeLogro: string;
    nota: number;
    puntajeSimce: number;
    nivelLogro: string;
    puntajePAES: number
}

export interface IBloqueNivel {
    nombre: string;
    rango: string;
    cantidadEstudiantes: number;
    porcentaje: string;
}

export interface IBloque {
    bloque: string;
    letra: string;
    descripcion: string;
    niveles: IBloqueNivel[];
}

export interface IReferencia {
    letra: string;
    bloque: string;
    descripcion: string;
}

export interface IBloqueEstudiante {
    letra: string;
    porcentajeLogro: number;
    nivel: string;
    texto: string;
    esNivelBajo: boolean;
}

export interface IEstudianteAnalisisDetalle {
    numero: number;
    nombreEstudiante: string;
    bloques: IBloqueEstudiante[];
}

export interface IAnalisisEntradaCurricular {
    tipoEntrada: string;
    bloques: IBloque[];
    referencias: IReferencia[];
    listadoIndividual: IEstudianteAnalisisDetalle[];
}

export interface IAlternativa {
    letra: string;
    porcentaje: string;
    cantidad: number;
}

export interface ITendenciaPregunta {
    pregunta: number;
    tipo: string;
    puntaje: string;
    alternativas: IAlternativa[];
    noRespondio: string;
    respuestaCorrecta: string;
    mayorTendencia: string;
}

export interface IInformeDetallado {
    establecimiento: string;
    curso: string;
    asignatura: string;
    establecimientoLogo: string;
    establecimientoRbd: string;
    nombresEntradasCurriculares: string[];
    antecedentesGeneralesEvaluacion: IAntecedentesEvaluacion;
    antecedentesGeneralesResultados: IAntecedentesResultados;
    balanceCurricularLogros: INivelLogro[];
    nivelesEvaluacionSimce: INivelLogro[];
    nivelesEvaluacionPaes?: INivelLogro[];
    listadoIndividualLogros: IEstudianteDetalle[];
    analisisEntradasCurriculares: IAnalisisEntradaCurricular[];
    analisisTendenciasPregunta: ITendenciaPregunta[];
    evaluacion: {
        nombre: string,
        fecha: string
    }
}

//Individual
interface IEnsayo {
    numero: number;
    porcentajeLogro: number | null;
    puntajeSimce: number | null;
    nota: number | null;
    tendencia: 'subida' | 'bajada' | 'estable' | null;
    rendido: boolean;
}



export interface IEstudianteEvaluacion {
    id: number;
    nombre: string;
    ensayos: IEnsayo[];
    promedio: {
        porcentajeLogro: number;
        puntajeSimce: number;
        nota: number;
        tendencia: 'subida' | 'bajada' | 'estable';
    }
}


/**
 * Informe Por Estudiantes
 */

export interface ICursoInforme {
    estudiantes: IEstudianteEvaluacion[];
    componentes: ICursoInformeEntrada[]
}

export interface ICursoInformeEntrada {
    entrada: string;
    items: ICursoInformeItemEntrada[]
}

export interface ICursoInformeItemEntrada {
    nombre: string;
    alias: string;
    promedio: string;
}

export interface ICursoInformeEstudianteItemEntrada {
    estudiante: string;
    puntaje: number;
}

/**
 * Informa Individual Estudiante
 */

/**
* Interfaces para el informe individual de estudiantes
*/

// Respuesta de una pregunta específica
export interface IRespuestaPregunta {
    pregunta: number;
    correcta: string;
    tuRespuesta: string;
    resultado: 'Correcto' | 'Incorrecto' | 'Sin respuesta' | 'Desarrollo';
    explicacion: string;
    tipoPregunta: 'V/F' | 'Desarrollo' | 'Alternativas' | 'Otro';
    puntajePregunta: number;
    puntajeObtenido: number;
}

// Evaluación en la progresión histórica
export interface IEvaluacionProgresion {
    nombreEvaluacion: string;
    nEnsayo: number;
    nota: number;
    aumentoDesdeInicio: number;
}

// Evaluación actual con el aumento calculado
export interface IEvaluacionActual {
    nombreEvaluacion: string;
    nEnsayo: number;
    nota: number;
    aumentoDesdeInicio: number;
}

// Datos completos de un estudiante (resultado de la función SQL)
export interface IEstudianteInforme {
    usuarioId: number;
    nombreCompleto: string;
    fotografiaUrl: string | null;
    nota: number;
    notaPromedioCurso: number;
    puntajeTotalObtenido: number;
    puntajeTotalEvaluacion: number;
    porcentajeLogro: number;
    puntajeSimce: number;
    exigencia: string;
    progresion: IEvaluacionProgresion[] | null;
    evaluacionActual: IEvaluacionActual;
    resultados: IRespuestaPregunta[];
}

export interface IEstudianteInformeIndividual {
    curso: ICurso;
    establecimiento: IEstablecimiento;
    evaluacionNombre: string;
    fechaEvaluacion: DateTime;
    resultados: IEstudianteInforme[]
}
