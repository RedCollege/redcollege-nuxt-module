import type { DateTime } from "luxon";
import type { ICurso, IUsuario } from "..";

export interface IRegistroAtencion {
    id: number;
    establecimientoId: number;
    usuarioId: number;
    cursoId: number;
    periodo: number;
    pacienteId: number;
    fechaIngreso: DateTime;
    origenId: number;
    origen: string | number;
    motivo: string | number;
    diagnostico: string;
    isFinalizada?: boolean;
    fechaSalida?: DateTime;
    destinoId?: number;
    destino?: string | number;
    tratamientoId?: number;
    tratamiento?: string | number;
    indicaciones?: string;
    paciente: IUsuario;
    usuario: IUsuario;
    curso: ICurso;
    deletedBy?: number;
    deletedAt?: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IRegistroAtencionResponse {
    meta: {
        total: number;
        perPage: number;
        currentPage: number;
    };
    data: IRegistroAtencion[];
}

export interface IRegistroAtencionForm {
    establecimientoId: number;
    usuarioId: number;
    cursoId: number;
    periodo: number;
    pacienteId: number;
    fechaIngreso: DateTime;
    origenId: number;
    motivoId: number[];
    diagnostico: string;
    isFinalizada?: boolean;
    fechaSalida?: DateTime;
    destinoId?: number;
    tratamientoId?: number;
    indicaciones?: number;
}
