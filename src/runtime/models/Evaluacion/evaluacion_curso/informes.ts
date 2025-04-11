/**
 * Interfaces para el informe detallado de evaluación
 */

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
    listadoIndividualLogros: IEstudianteDetalle[];
    analisisEntradasCurriculares: IAnalisisEntradaCurricular[];
    analisisTendenciasPregunta: ITendenciaPregunta[];
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
