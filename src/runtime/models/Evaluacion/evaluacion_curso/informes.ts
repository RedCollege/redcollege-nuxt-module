/**
 * Interfaces para el informe detallado de evaluación
 */

import type { IItemEntradaCurricular } from "../../Curriculum";
import type { IEvaluacion } from "../evaluacion";
import type { IUsuario } from "../../Auth/usuario";
import type { IAsignaturaEvalua } from "../evaluacion_curso";

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


// Interfaces para el modelo de evaluación

export interface IPregunta {
  id: number;
  orden: number;
  contenido: string;
  descripcion: string;
  puntaje: string;
  itemId: number;
  evaluacionId: number;
  tipoItemEvaluacionId: number;
  createdAt: string;
  updatedAt: string;
  nItem: number;
}

export interface IRespuestaSeleccionada {
  id: number;
  isCorrecta: boolean;
  descripcion: string;
  itemId: number;
  createdAt: string;
  updatedAt: string;
  orden: number;
}

export interface IRespuestaCorrecta {
  id: number;
  descripcion: string;
  isCorrecta: boolean;
  orden: number;
  itemId: number;
}

export interface IDetalleRespuesta {
  pregunta: IPregunta;
  respuestaSeleccionada: IRespuestaSeleccionada;
  esCorrecta: boolean;
  respuestaCorrecta: IRespuestaCorrecta;
  explicacion: string;
}

// Interfaces para el informe individual

export interface IActividad {
  descripcion: string;
  nivel_logro: string;
  porcentaje_logro: number;
}

export interface IAreaAprendizaje {
  name: string;
  items: IItemEntradaCurricular[];
}

export interface IResumenGeneral {
  puntajeTotal: number;
  puntajeObtenido: number;
  porcentajeLogro: number;
  nota: number;
  fechaEvaluacion: string;
  exigencia: number;
  notaPromedioDelCurso: number;
  puntaje: number;
}

export interface IInformeEstudianteIndividual {
  id: number;
  estudiante: Partial<IUsuario>;
  resumenGeneral: IResumenGeneral;
  detalleRespuestas: IDetalleRespuesta[];
  evolucion: Array<{
    nota: number;
    createdAt: string;
    nombreEvaluacion: string | null;
  }>;
  areasAprendizaje: IAreaAprendizaje[];
  recomendaciones: string[];
  observaciones: string | null;
  actividades: IActividad[];
  asignatura: Partial<IAsignaturaEvalua>;
  evaluacion: Omit<IEvaluacion, 'asignatura'> & {
    // Usamos Omit para excluir campos no necesarios y añadimos los específicos
    grupoAsignaturaId: number;
    gradoEducacionalId: number;
  };
}