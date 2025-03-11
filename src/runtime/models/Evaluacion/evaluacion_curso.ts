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

export interface ICursoEvalua {
    id: number;
    nombre: string;
    asignaturas: IAsignaturaEvalua[];
}
