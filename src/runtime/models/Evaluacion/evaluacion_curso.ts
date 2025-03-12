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
    porcentajeInsuficiente: string;
    porcentajeElemental: string;
    porcentajeAdecuado: string;
    cantidadInsuficientes: string;
    cantidadHombres: string;
    cantidadMujeres: string;
    promedioTotal: number;
}

interface ICursoEvalua {
    id: number;
    nombre: string;
    asignaturas: IAsignaturaEvalua[];
}

interface ICursoComponenteEvalua {
    curso_id: number;
    curso_nombre: string;
    items: IEntradaEvalua[];
}

interface IEntradaEvalua {
    entrada: string;
    items: IItemInformeEvalua[];
}

interface IItemInformeEvalua {
    item_id: number;
    nombre: string;
    promedio: number;
}
