/**
 * Interfaces Informe Global (evalua 360)
 */

export interface IInformeGlobalEvalua {
    informacionGeneralCursosGlobal: Array<ICursoGlobalEvalua>;
    informeComponentesGlobal: Array<ICursoComponenteEvalua>;
}

export interface ICursoGlobalEvalua {
    sigeId: number;
    sigeNombre: string;
    asignaturas: IAsignaturaGlobalEvalua[];
}

interface IAsignaturaGlobalEvalua {
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
}
