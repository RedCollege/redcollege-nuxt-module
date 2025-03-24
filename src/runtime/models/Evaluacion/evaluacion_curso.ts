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

interface IAsignaturaEvalua {
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
}

export interface IEnsayoEstablecimientoEvalua {
    nEnsayo: number;
    promedio: number;
    tendencia?: 'subida' | 'bajada' | 'estable';
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
    nombre: string;
    establecimientos: IEstablecimientoItemEvalua[];
}

export interface IEstablecimientoItemEvalua {
    establecimiento_id: number;
    establecimiento_nombre: string;
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