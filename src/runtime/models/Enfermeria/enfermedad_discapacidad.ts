export enum TipoEnfermedadEnum{
    ENFERMEDAD = 'enfermedad',
    DISCAPACIDAD = 'discapacidad'
}

export interface IEnfermedadDiscapacidad {
    id: number
    nombre: string
    establecimientoId: number
    tipo: TipoEnfermedadEnum
}

export interface IEnfermedadDiscapacidadForm {
    establecimientoId: number
    nombre: string
    alias: string
    tipo: string
}