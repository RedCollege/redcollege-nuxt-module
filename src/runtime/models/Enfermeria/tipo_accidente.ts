export interface ITipoAccidente {
    id: number
    nombre: string
    establecimientoId: number
}

export interface ITipoAccidenteForm {
    establecimientoId: number
    nombre: string
}