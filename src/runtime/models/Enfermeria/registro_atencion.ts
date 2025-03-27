import type { DateTime } from "luxon"
import type { ICurso, IConfiguracionItem, IUsuario } from ".."

export interface IRegistroAtencion {
    id: number
    establecimientoId: number
    usuarioId: number
    cursoId: number
    periodo: number
    pacienteId: number
    fechaIngreso: DateTime
    origenId: number
    origen: IConfiguracionItem
    motivo: IConfiguracionItem[]
    diagnostico: string
    isFinalizada?: boolean
    fechaSalida?: DateTime
    destinoId?: number
    destino?: IConfiguracionItem
    tratamientoId?: number
    tratamiento?: IConfiguracionItem
    indicaciones?: string
    paciente: IUsuario
    usuario: IUsuario
    curso: ICurso
    deletedBy?: number
    deletedAt?: DateTime
    createdAt: DateTime
    updatedAt: DateTime
}

export interface IRegistroAtencionResponse {
    meta: {
        total: number
        perPage: number
        currentPage: number
    }
    data: IRegistroAtencion[]
}

export interface IRegistroAtencionForm {
    establecimientoId: number
    usuarioId: number
    cursoId: number
    periodo: number
    pacienteId: number
    fechaIngreso: DateTime
    origenId: number
    motivoId: number[]
    diagnostico: string
    isFinalizada?: boolean
    fechaSalida?: DateTime
    destinoId?:  number
    tratamientoId?: number
    indicaciones?: number
}

export interface IRegistroAtencionFilters {
    trashed?: boolean;
    searchTerm?: string;
    page?: number;
    periodo?: string | number;
    establecimiento?: number | string;
    rangoFecha?: string;
    paciente?: number | string;
    curso?: string | number;
    motivo?: string;
    origen?: string;
    destino?: string;
    estado?: boolean;
}