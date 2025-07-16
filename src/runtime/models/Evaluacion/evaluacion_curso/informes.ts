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

interface IDetalleRespuesta {
  pregunta: {
    id: number,
    orden: number,
    contenido: string,
    descripcion: string,
    puntaje: string,
    itemId: number,
    evaluacionId: number,
    tipoItemEvaluacionId: number,
    createdAt: string,
    updatedAt: string,
    nItem: number
  },
  respuestaSeleccionada: {
    id: number,
    isCorrecta: boolean,
    descripcion: string,
    itemId: number,
    createdAt: string,
    updatedAt: string,
    orden: number
  },
  esCorrecta: boolean;
  respuestaCorrecta: {
    id: number,
    descripcion: string,
    isCorrecta: boolean,
    orden: number,
    itemId: number
  }
}

export interface IInformeEstudianteIndividual {
  id: number;
  estudiante: {
    id: number;
    nombre: string;
    avatar: string;
  };
  resumenGeneral: {
    puntajeTotal: number,
    puntajeObtenido: number,
    porcentajeLogro: number,
    nota: number,
    fechaEvaluacion: string
  };
  detalleRespuestas: Array<IDetalleRespuesta>,
  evolucion: Array<{
    fecha: string;
    porcentajeLogro: number;
  }>;
  areasAprendizaje: Array<{
    id: number;
    descripcion: string;
    total_preguntas: number;
    respuestas_correctas: number;
  }>;
  recomendaciones: string[];
  observaciones: {
    contenido: string;
  };
}