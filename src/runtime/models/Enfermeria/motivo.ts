export interface IMotivo {
    id: number
    nombre: string
    establecimientoId: number
}

export interface IMotivoForm {
    establecimientoId: number
    nombre: string
}