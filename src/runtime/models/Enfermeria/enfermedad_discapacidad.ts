export enum TipoEnfermedadEnum{
    ENFERMEDAD = 'enfermedad',
    DISCAPACIDAD = 'discapacidad'
}

export interface IEnfermedadDiscapacidad {
    id: number
    nombre: string
    establecimientoId: number
    tipo: TipoEnfermedadEnum
    deletedBy: number | null
    deletedAt: string | null
    createdAt: string
    updatedAt: string
}

export interface IEnfermedadDiscapacidadForm {
    establecimientoId: number
    nombre: string
    alias: string
    tipo: string
}