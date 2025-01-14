import type { DateTime } from "luxon"
import type { ICurso, IUsuario } from ".."

export interface IRegistroAtencion {
    id: number
    establecimientoId: number
    usuarioId: number
    cursoId: number
    periodo: number
    pacienteId: number
    fechaIngreso: DateTime
    origen: string
    motivo: string
    diagnostico: string
    isFinalizada?: boolean
    fechaSalida?: DateTime
    destino?: string
    tratamiento?: string
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
    origen: string
    motivo: string
    diagnostico: string
    isFinalizada?: boolean
    fechaSalida?: DateTime
    destino?: string
    tratamiento?: string
    indicaciones?: string
}