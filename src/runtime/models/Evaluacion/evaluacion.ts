import type { IAsignaturaCurricular } from "..";

export interface IEvaluacion {
    id: number;
    nombre: string;
    descripcion: string | null;
    dificultad: number;
    notaMinima: string;
    adjunto: string;
    periodo: number;
    usuarioId: number;
    tipoEvaluacionId: number;
    establecimientoId: number;
    createdAt: string;
    updatedAt: string;
    gradoEducacionalId: number;
    nivelEducacionalId: number;
    tipoEducacionId: number;
    asignaturaId: number;
    isSimce: boolean;
    nEnsayo: string;
    grupoAsignaturaId: number;
    asignatura: IAsignaturaCurricular
}
