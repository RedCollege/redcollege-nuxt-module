/**
 * Main Interfaces
 */

import type { ICurso } from "..";
import type { IEvaluacion } from "./evaluacion";

export interface IEvaluacionCurso {
    id: number;
    inicioOnline: string;
    finOnline: string;
    isHabilitada: boolean;
    cursoId: number;
    evaluacionId: number;
    isProgramada: boolean;
    createdAt: string;
    updatedAt: string;
    showCronometro: boolean;
    isRevisada: boolean;
    willFinishOnTime: boolean;
    evaluacion: IEvaluacion;
    curso: ICurso;
}

/**
 * Interfaces Informe Global (evalua 360)
 */

export interface IInformeGlobalEvalua {
    informacionGeneralCursosGlobal: Array<ICursoGlobalEvalua>;
    informeComponentesGlobal: Array<IComponenteGlobalEvalua>;
}

export interface ICursoGlobalEvalua {
    sigeId: number;
    sigeNombre: string;
    asignaturas: IAsignaturaGlobalEvalua[];
}

export interface IComponenteGlobalEvalua {
    sigeId: number;
    sigeNombre: string;
    asignaturas: IAsignaturaComponenteGlobalEvalua[];
}

export interface IAsignaturaComponenteGlobalEvalua {
    asignaturaNombre: string;
    entradas: IEntradaEvalua[]
}

export interface IAsignaturaGlobalEvalua {
    id: number;
    nombre: string;
    cantidadAlumnos: number;
    porcentajeInsuficiente: number;
    porcentajeElemental: number;
    porcentajeAdecuado: number;
    cantidadInsuficientes: number;
    promedioTotal: number;
    promedioSimceHombres: number;
    promedioSimceMujeres: number;
    ensayos: IAsignaturaEnsayoGlobalEvalua[];
}

export interface IAsignaturaEnsayoGlobalEvalua {
    nEnsayo: number;
    promedio: number;
    promedioHombres: number;
    promedioMujeres: number;
    cantidadAlumnos: number;
    alumnosInsuficientes?: IAlumnoInsuficienteDetalle[];
}

/**
 * Interfaces Informe Curso (evalua 360)
 */

export interface IInformeCursoEvalua {
    informacionGeneralCursos: Array<ICursoEvalua>;
    informeComponentes: Array<ICursoComponenteEvalua>;
}

interface IEnsayoEvalua {
    nEnsayo: string;
    promedioSimceHombres: string;
    promedioSimceMujeres: string;
    promedio: number;
}

export interface IAsignaturaEvalua {
    id: number;
    nombre: string;
    ensayos: IEnsayoEvalua[];
    porcentajeInsuficiente: number;
    porcentajeElemental: number;
    porcentajeAdecuado: number;
    cantidadInsuficientes: number;
    cantidadHombres: number;
    cantidadMujeres: number;
    promedioTotal: number;
    alumnosInsuficientes?: IAlumnoInsuficienteDetalle[];
}

export interface ICursoEvalua {
    id: number;
    nombre: string;
    asignaturas: IAsignaturaEvalua[];
}

export interface ICursoComponenteEvalua {
    curso_id: number;
    curso_nombre: string;
    promedio?: number;
    asignaturas: IAsignaturaCursoComponenteEvalua[];
}

export interface IAsignaturaCursoComponenteEvalua {
    asignaturaNombre: string;
    entradas: IEntradaEvalua[];
}

export interface IEntradaEvalua {
    entrada: string;
    items: IItemInformeEvalua[];
}

interface IItemInformeEvalua {
    item_id: number;
    nombre: string;
    promedio: number;
    alias: string;
    cursos?: ICursoComponenteEvalua[]
}

/**
 * Interfaces Informe Establecimientos (evalua 360)
 */
export interface IInformeEstablecimientoEvalua {
    informacionGeneralEstablecimientos: Array<IEstablecimientoEvalua>;
    informeComponentes: Array<IComponenteEstablecimientoEvalua>;
}

export interface IEstablecimientoEvalua {
    establecimientoId: number;
    establecimientoNombre: string;
    establecimientoLogo: string;
    ensayos: IEnsayoEstablecimientoEvalua[];
    promedioTotal: number;
    porcentajeAdecuado: number;
    porcentajeElemental: number;
    porcentajeInsuficiente: number;
    tendenciaPromedio: 'subida' | 'bajada' | 'estable' | undefined;
}

export interface IEnsayoEstablecimientoEvalua {
    id: number;
    nombre: string;
    nEnsayo: number;
    promedio: number;
    nivelNombre: string;
    tendencia?: 'subida' | 'bajada' | 'estable';
    asignaturaNombre: string
    grupoAsignaturaId: number
    sigeId: number
}

export interface IComponenteEstablecimientoEvalua {
    entrada_descripcion: string;
    asignaturas: IAsignaturaEstablecimientoComponenteEvalua[];
}

export interface IAsignaturaEstablecimientoComponenteEvalua {
    asignaturaNombre: string;
    items: IItemEstablecimientoEvalua[];
}

export interface IItemEstablecimientoEvalua {
    item_id: number;
    item_alias: string;
    nombre: string;
    establecimientos: IEstablecimientoItemEvalua[];
}

export interface IEstablecimientoItemEvalua {
    establecimiento_id: number;
    establecimiento_nombre: string;
    establecimiento_logo: string;
    promedio: number;
}

/**
 * Interfaces para el controlador de Evaluación
 */
export interface IRequestEstablecimientoEvalua {
    periodo: number;
    establecimientoIds: number[];
}

export interface IResponseEstablecimientoEvalua {
    informacionGeneralEstablecimientos: IEstablecimientoEvalua[];
    informeComponentes: IComponenteEstablecimientoEvalua[];
}


/**
 * Tipados alumnos insuficientes
 */

export interface IAlumnoDetalle {
    id: number;
    rut: string;
    nombreCompleto: string;
    cursoId: number;
    grupoAsignaturaId: number;
    nEnsayo: number;
    nombreEnsayo: string;
    porcentajeLogro: number;
    puntajeSimce: number;
}

export interface IAlumnoInsuficienteDetalle {
    id: number;
    rut: string;
    nombreCompleto: string;
    ensayos: Array<{
        nEnsayo: number;
        nombreEnsayo: string;
        puntaje: number;
        porcentajeLogro: number;
        tendencia?: 'subida' | 'bajada' | 'estable'; // Tendencia respecto al ensayo anterior
    }>;
    promedio: number;
    tendenciaPromedio?: 'subida' | 'bajada' | 'estable'; // Tendencia general
}
